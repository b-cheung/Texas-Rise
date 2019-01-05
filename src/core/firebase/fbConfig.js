import firebase from 'firebase';
import 'firebase/firestore';
import * as fbCred from './FirebaseCredentials';

// Initialize Firebase
const firebaseConfig = {
  apiKey: fbCred.FIREBASE_API_KEY,
  authDomain: fbCred.FIREBASE_AUTH_DOMAIN,
  databaseURL: fbCred.FIREBASE_DATABASE_URL,
  projectId: fbCred.FIREBASE_PROJECT_ID,
  storageBucket: fbCred.FIREBASE_STORAGE_BUCKET,
  messagingSenderId: fbCred.FIREBASE_MESSAGING_SENDER_ID
};

export function initializeFirebase() {
  console.tron.log('Initialize Firebase');
  firebase.initializeApp(firebaseConfig);
	firebase.firestore().settings({ timestampsInSnapshots: true });
	// console.tron.log('setup Firebase complete', auth, firestore);
}

export default firebase;

