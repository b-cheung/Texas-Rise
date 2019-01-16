import firebase from 'firebase';
import 'firebase/firestore';
import moment from 'moment';
import * as fbAuth from './fbAuth';

const firestore = fbAuth.firestore;
// export class Firebase {
//   static auth;
//   static firestore;
//   static settings;
//   static init() {
//     console.tron.log('Initialize Firebase');
//     firebase.initializeApp(firebaseConfig);

//     console.tron.log('Initialize Firebase auth');
//     Firebase.auth = firebase.auth();
//     Firebase.firestore = firebase.firestore();
//     Firebase.settings = { timestampsInSnapshots: true };
//     Firebase.firestore.settings(settings);
//   }
// }

function getDoc(docRef) {
  return docRef
    .get()
    .catch(error => {
      console.tron.log('Error getting document:', error);
      throw error;
    })
    .then(doc => {
      if (doc.exists) {
        console.tron.log('doc exists');
        return doc;
      }
      // doc.data() will be undefined in this case
      console.tron.log('No such document');
      throw new Error('No such document');
    });
  // case for null doc`
}

function getDocs(queryRef) {
  console.tron.log('getDocs');
  return queryRef
    .get()
    .catch(error => {
      console.tron.log('Error getting document(s):', error);
      throw error;
    })
    .then(querySnapshot => {
      if (querySnapshot.size > 0) {
        console.tron.log('Documents found.');
        /*{
          id: {val},
          ...,
          id: {val}
        }*/
        return querySnapshot.docs;
      }
      console.tron.log('No documents found.');
      throw new Error('No documents found.');
    });
}

export function getTimestamp() {
  return firebase.firestore.FieldValue.serverTimestamp();
}

// Create user in firestore
export function createUserDoc(data, authUser) {
  console.tron.log('createUser', authUser.uid);
  const { firstName, lastName, email, year, role } = data;
  firestore
    .collection('users')
    .doc(authUser.uid)
    .set({
      firstName,
      lastName,
      email,
      year,
      role
    })
    .catch(error => {
      throw error;
    });
}

// Create announcement in firestore
export function createAnnouncementDoc(data) {
  const { title, body, audience, user } = data;
  if (!fbAuth.isAdminOrOfficer(user)) {
    throw fbAuth.authError;
  }
  return firestore
    .collection('announcements')
    .add({
      title,
      body,
      audience: {
        admin: true,
        officer: true,
        ...audience
      },
      author: {
        uid: user.uid,
        firstName: user.firstName,
        lastName: user.lastName
      },
      timestamp: getTimestamp()
    })
    .then(docRef => {
      return getDoc(docRef);
    })
    .catch(error => {
      throw error;
    });
}

export function createPollDoc(data) {
  const { title, description, dateTimeStart, dateTimeEnd, pollType, pollItems, user } = data;
  if (!fbAuth.isAdminOrOfficer(user)) {
    throw fbAuth.authError;
  }
  return firestore
    .collection('polls')
    .add({
      title,
      description,
      dateTimeStart,
      dateTimeEnd,
      pollType,
      pollItems,
      author: {
        uid: user.uid,
        firstName: user.firstName,
        lastName: user.lastName
      },
      active: true,
      timestamp: getTimestamp()
    })
    .then(docRef => {
      return getDoc(docRef);
    })
    .catch(error => {
      throw error;
    });
}

// retrieve user doc in firestore
export function fetchUser(authUser) {
  const docRef = firestore.collection('users').doc(authUser.uid);
  return getDoc(docRef);
}

export function fetchAnnouncements(data) {
  const { userRole, numAnnouncements } = data;
  const queryRef = buildAnnouncementQuery(userRole).limit(numAnnouncements);
  return getDocs(queryRef);
}

export function fetchNewAnnouncements(data) {
  const { userRole, timestamp } = data;
  const queryRef = buildAnnouncementQuery(userRole).endBefore(timestamp);
  return getDocs(queryRef);
}

export function fetchOldAnnouncements(data) {
  const { userRole, numAnnouncements, timestamp } = data;
  const queryRef = buildAnnouncementQuery(userRole)
    .startAfter(timestamp)
    .limit(numAnnouncements);
  return getDocs(queryRef);
}

function buildAnnouncementQuery(userRole) {
  return firestore
    .collection('announcements')
    .where(`audience.${userRole}`, '==', true)
    .orderBy('timestamp', 'desc');
}

export function fetchPoll(pollId) {
  const docRef = firestore.collection('polls').doc(pollId);
  return getDoc(docRef);
}

export function fetchPolls(data) {
  const { numPolls } = data;
  const queryRef = firestore
    .collection('polls')
    .orderBy('timestamp', 'desc')
    .limit(numPolls);
  return getDocs(queryRef);
}

export function fetchActivePolls() {
  const queryRef = firestore
    .collection('polls')
    .where('active', '==', true)
    .orderBy('timestamp', 'desc');
  return getDocs(queryRef);
}

export function fetchPollResults(pollId) {
  const queryRef = firestore
    .collection('polls')
    .doc(pollId)
    .collection('results');
  return getDocs(queryRef);
}

export function votePoll(data) {
  const { pollId, itemId, itemName, spec, user } = data;
  console.tron.log('votePoll', data);
  // Create reference to poll doc
  const pollRef = firestore.collection('polls').doc(pollId);

  // Create a reference to pollItem doc
  const pollItemRef = pollRef.collection('results').doc(itemId);

  return firestore
    .runTransaction(transaction => {
      // This code may get re-run multiple times if there are conflicts.
      return transaction.get(pollItemRef).then(pollItemDoc => {
        console.tron.log('runTransaction');

        // check if pollItemDoc exists
        if (!pollItemDoc.exists) {
          console.tron.log('pollItemDoc does not exist yet');
          transaction.set(pollItemRef, {
            itemName,
            spec: [spec],
            votes: 1
          });
          // throw new Error('Document does not exist!');
        } else {
          //append new spec to array and increment vote count
          const newVotes = pollItemDoc.data().votes + 1;
          transaction.update(pollItemRef, {
            spec: firebase.firestore.FieldValue.arrayUnion(spec),
            votes: newVotes
          });
        }
        // append voter to array
        transaction.update(pollRef, {
          voters: firebase.firestore.FieldValue.arrayUnion(user.uid)
        });
      });
    })
    .then(() => {
      console.tron.log('Transaction successfully committed!');
    })
    .catch(error => {
      throw error;
    });
}

export function togglePollState(data) {
  const { pollId, active } = data;
  const pollRef = firestore.collection('polls').doc(pollId);

  return pollRef
    .update({ active })
    .then(() => {
      console.tron.log('Document successfully updated!');
    })
    .catch(error => {
      throw error;
    });
}
