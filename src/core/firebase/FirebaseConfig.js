import firebase from 'firebase';
import 'firebase/firestore';
import * as fbCred from './FirebaseCredentials';

// Initialize Firebase
const config = {
  apiKey: fbCred.FIREBASE_API_KEY,
  authDomain: fbCred.FIREBASE_AUTH_DOMAIN,
  databaseURL: fbCred.FIREBASE_DATABASE_URL,
  projectId: fbCred.FIREBASE_PROJECT_ID,
  storageBucket: fbCred.FIREBASE_STORAGE_BUCKET,
  messagingSenderId: fbCred.FIREBASE_MESSAGING_SENDER_ID
};

console.log('Initialize Firebase');
firebase.initializeApp(config);

console.log('Initialize Firebase auth');
export const auth = firebase.auth();
export const firestore = firebase.firestore();
export const settings = { timestampsInSnapshots: true };
firestore.settings(settings);
