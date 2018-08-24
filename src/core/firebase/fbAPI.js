import firebase from 'firebase';
import 'firebase/firestore';
import moment from 'moment';
import * as fbCred from './FirebaseCredentials';
import * as authService from './authService';
import NavigationService from '../navigation/NavigationService';

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

// Initialize Firebase
const firebaseConfig = {
  apiKey: fbCred.FIREBASE_API_KEY,
  authDomain: fbCred.FIREBASE_AUTH_DOMAIN,
  databaseURL: fbCred.FIREBASE_DATABASE_URL,
  projectId: fbCred.FIREBASE_PROJECT_ID,
  storageBucket: fbCred.FIREBASE_STORAGE_BUCKET,
  messagingSenderId: fbCred.FIREBASE_MESSAGING_SENDER_ID
};

let auth;
let firestore;
let settings;
export function initializeFirebase() {
  console.tron.log('Initialize Firebase');
  firebase.initializeApp(firebaseConfig);

  console.tron.log('Initialize Firebase auth');
  auth = firebase.auth();
  firestore = firebase.firestore();
  settings = { timestampsInSnapshots: true };
  firestore.settings(settings);
}

export function getAuthUser() {
  return new Promise((resolve, reject) => {
    const unsubscribe = auth.onAuthStateChanged(user => {
      unsubscribe();
      resolve(user);
    }, reject);
  });
}

export function reloadAuthUser() {
  return auth.currentUser
    .reload()
    .then(() => {
      return getAuthUser();
    })
    .catch(error => {
      // An error happened.
      throw error;
    });
}

export function sendVerificationEmail() {
  auth.currentUser.sendEmailVerification().catch(error => {
    // An error happened.
    throw error;
  });
}

export function getUserClaims() {
  return auth.currentUser.getIdTokenResult(true).then(token => {
    return token.claims;
  });
}

// export function getAuthUser() {
//   const user = auth.currentUser;
//   console.tron.log('getAuthUser', user);
//   return user;
// }

export function setAuthStateListener() {
  console.tron.log('setAuthStateListener');
  const unsubscribe = auth.onAuthStateChanged(user => {
    console.tron.log('onAuthStateChanged');
    if (user) {
      console.tron.log('logged in');
    } else {
      NavigationService.navigate('Welcome');
      unsubscribe();
    }
  });
}

// Register and create user in firestore
export function register(data) {
  const { email, password } = data;
  return auth.createUserWithEmailAndPassword(email, password).catch(error => {
    throw error;
  });
}

// Login user
export function login(data) {
  const { email, password } = data;
  console.tron.log(email, password);
  return auth.signInWithEmailAndPassword(email, password).catch(error => {
    throw error;
  });
}

// Logout user
export function logout() {
  auth.signOut().catch(error => {
    throw error;
  });
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
  const { title, body, member, student, user } = data;
  if (authService.isAdminOrOfficer(user.role)) {
    throw authService.error;
  }
  return firestore
    .collection('announcements')
    .add({
      title,
      body,
      audience: {
        admin: true,
        officer: true,
        member,
        student
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
  console.tron.log('createPollDoc');
  const { title, startDateTime, endDateTime } = data;
  console.tron.log('createPollDoc', moment.unix(startDateTime).utc());
  firestore
    .collection('polls')
    .add({
      title,
      startDateTime: moment.unix(startDateTime).utc(),
      endDateTime: moment.unix(endDateTime).utc(),
      active: true
    })
    .catch(error => {
      throw error;
    });
}

// retrieve user doc in firestore
export function fetchUser(authUser) {
  console.tron.log('fetchUser', authUser.uid);
  const docRef = firestore.collection('users').doc(authUser.uid);
  return getDoc(docRef);
}

export function fetchAnnouncements(data) {
  const { num } = data;
  const queryRef = buildAnnouncementQuery(data).limit(num);
  return getDocs(queryRef);
}

export function fetchNewAnnouncements(data) {
  const { timestamp } = data;
  const queryRef = buildAnnouncementQuery(data).endBefore(timestamp);
  return getDocs(queryRef);
}

export function fetchOldAnnouncements(data) {
  const { num, timestamp } = data;
  const queryRef = buildAnnouncementQuery(data)
    .startAfter(timestamp)
    .limit(num);
  return getDocs(queryRef);
}

function buildAnnouncementQuery(data) {
  const { userRole } = data;
  return firestore
    .collection('announcements')
    .where(`audience.${userRole}`, '==', true)
    .orderBy('timestamp', 'desc');
}

function getDoc(docRef) {
  return docRef
    .get()
    .catch(error => {
      console.log('Error getting document:', error);
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
  return queryRef
    .get()
    .catch(error => {
      console.log('Error getting document(s):', error);
      throw error;
    })
    .then(querySnapshot => {
      if (querySnapshot.size > 0) {
        console.tron.log('Documents found.');
        /*Object: {
          id: Object {val},
          ...,
          id: Object {val}
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
