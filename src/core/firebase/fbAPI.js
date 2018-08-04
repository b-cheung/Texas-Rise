import firebase from 'firebase';
import { auth, firestore } from '../../core/firebase/FirebaseConfig';

export function getCurrentUser() {
  const user = auth.currentUser;
  console.tron.log('getCurrentUser', user);
  return user;
}

// callback(success, error)
// Register and create user in firestore
export function onRegister(data, callback) {
  const { email, password } = data;
  auth
    .createUserWithEmailAndPassword(email, password)
    .then(user => createUserDoc(data, user.user, callback))
    .catch(() => callback(false, 'Registration failed.'));
}

// Login user
export function onLogin(data, callback) {
  const { email, password } = data;
  console.tron.log(email, password);
  auth
    .signInWithEmailAndPassword(email, password)
    .then(user => callback(true, null))
    .catch(() => callback(false, 'Authentication failed.'));
}

// Logout user
export function onLogout(callback) {
  auth
    .signOut()
    .then(() => callback(true, null))
    .catch(() => callback(false, 'Unable to logout.'));
}

// Create user in firestore
export function createUserDoc(data, authUser, callback) {
  console.tron.log('createUser', authUser.uid);
  const { firstName, lastName, year, email, role } = data;
  firestore
    .collection('users')
    .doc(authUser.uid)
    .set({
      email,
      firstName,
      lastName,
      role,
      year
    })
    .then(() => callback(true, null))
    .catch(() => callback(false, 'Unable to create user.'));
}

// callback(success, user, error)
// Create announcement in firestore
export function createAnnouncementDoc(data, callback) {
  const { title, body, membersChecked, studentsChecked, user } = data;
  firestore
    .collection('announcements')
    .add({
      title,
      body,
      audience: {
        members: membersChecked,
        students: studentsChecked
      },
      author: {
        uid: user.uid,
        firstName: user.firstName,
        lastName: user.lastName
      },
      timestamp: getTimeStamp()
    })
    .then(docRef => getDoc(docRef, callback))
    .catch(() => callback(false, 'Unable to create announcement.'));
}

// retrieve user doc in firestore
export function fetchUser(authUser, callback) {
  console.tron.log('fetchUser', authUser.uid);
  const docRef = firestore.collection('users').doc(authUser.uid);
  getUserDoc(docRef, callback);
}

export function fetchAnnouncements(num, callback) {
  const docsRef = firestore
    .collection('announcements')
    .orderBy('timestamp', 'desc')
    .limit(num);
  getDocs(docsRef, callback);
}

function getUserDoc(docRef, callback) {
  docRef
    .get()
    .then(doc => {
      if (doc.exists) {
        console.tron.log('User document exists.');
        callback(true, { ...doc.data(), uid: doc.id }, null);
      } else {
        // doc.data() will be undefined in this case
        console.tron.log('No such user document.');
        callback(false, null, 'No such user document.');
      }
    })
    .catch(error => {
      console.tron.log('Error getting user document:', error);
      callback(false, null, 'Error getting user document.');
    });
}

function getDoc(docRef, callback) {
  docRef
    .get()
    .then(doc => {
      if (doc.exists) {
        console.tron.log('doc exists');
        callback(true, { id: doc.id, val: doc.data() }, null);
      } else {
        // doc.data() will be undefined in this case
        console.tron.log('No such document');
        callback(false, null, 'No such document.');
      }
    })
    .catch(error => {
      console.tron.log('Error getting document:', error);
      callback(false, null, 'Error getting document.');
    });
}

function getDocs(docsRef, callback) {
  docsRef
    .get()
    .then(querySnapshot => {
      if (querySnapshot.size > 0) {
        console.tron.log('Documents found.');
        /*Object: {
          id: Object {val},
          ...,
          id: Object {val}
        }*/
        const data = {};
        querySnapshot.forEach(doc => {
          data[doc.id] = doc.data();
        });
        callback(true, data, null);
      } else {
        console.tron.log('No documents found.');
        callback(false, null, 'No documents found.');
      }
    })
    .catch(error => {
      console.tron.log('Error getting document(s):', error);
      callback(false, null, 'Error getting document(s).');
    });
}

function getTimeStamp() {
  return firebase.firestore.FieldValue.serverTimestamp();
}
