import firebase from 'firebase';
import 'firebase/firestore';
import * as fbCred from './FirebaseCredentials';
import NavigationService from '../navigation/NavigationService';


// Initialize Firebase
const config = {
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
  firebase.initializeApp(config);

  console.tron.log('Initialize Firebase auth');
  auth = firebase.auth();
  firestore = firebase.firestore();
  settings = { timestampsInSnapshots: true };
  firestore.settings(settings);
}

export function getCurrentUser() {
  return new Promise((resolve, reject) => {
     const unsubscribe = auth.onAuthStateChanged(user => {
        unsubscribe();
        resolve(user);
     }, reject);
  });
}


export function getAuthUser() {
  const user = auth.currentUser;
  console.tron.log('getAuthUser', user);
  return user;
}

export function setAuthStateListener() {
    console.tron.log('setAuthStateListener');
    const unsubscribe = auth.onAuthStateChanged(user => {
      console.tron.log('onAuthStateChanged');
      if (user) {
        console.tron.log('logged in');
      } else {
        NavigationService.navigate('Auth');
        unsubscribe();
      }
  });
}


// callback(success, error)
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
  auth
    .signOut()
    .catch(error => {
      throw error;
    });
}

// Create user in firestore
export function createUserDoc(data, authUser) {
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
    .catch(error => {
      throw error;
    });
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
export function fetchUser(authUser) {
  console.tron.log('fetchUser', authUser.uid);
  const docRef = firestore.collection('users').doc(authUser.uid);
  return getDoc(docRef);
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
        // callback(true, { id: doc.id, val: doc.data() }, null);
      }
      // doc.data() will be undefined in this case
      console.tron.log('No such document');
      throw new Error('No such document');
    });
  // case for null doc
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
