import firebase from 'firebase';
import * as fbCred from './FirebaseCredentials';
import NavigationService from '../navigation/NavigationService';

// Initialize Firebase
const firebaseConfig = {
  apiKey: fbCred.FIREBASE_API_KEY,
  authDomain: fbCred.FIREBASE_AUTH_DOMAIN,
  databaseURL: fbCred.FIREBASE_DATABASE_URL,
  projectId: fbCred.FIREBASE_PROJECT_ID,
  storageBucket: fbCred.FIREBASE_STORAGE_BUCKET,
  messagingSenderId: fbCred.FIREBASE_MESSAGING_SENDER_ID
};

// export function initializeFirebase() {
  console.tron.log('Initialize Firebase');
  firebase.initializeApp(firebaseConfig);

  console.tron.log('Initialize Firebase auth');
  export const auth = firebase.auth();
  export const firestore = firebase.firestore();
	firestore.settings({ timestampsInSnapshots: true });

	// return getAuthUser();
// }

export function getAuthUser() {
  return new Promise((resolve, reject) => {
    const unsubscribe = auth.onAuthStateChanged(user => {
      unsubscribe();
      resolve(user);
    }, reject);
  });
}

// export function getAuthUser() {
//   const user = auth.currentUser;
//   console.tron.log('getAuthUser', user);
//   return user;
// }

export function isLoggedIn() {
  if (getAuthUser()) {
    return true;
  } 
  return false;
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

export function setAuthStateListener() {
  console.tron.log('setAuthStateListener');
  const unsubscribe = auth.onAuthStateChanged(user => {
    console.tron.log('onAuthStateChanged');
    if (user) {
			console.tron.log('logged in');
			// NavigationService.navigate('Home');
    } else {
			console.tron.log('logged out');
      NavigationService.navigate('Welcome');
      unsubscribe();
    }
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

// response = {user}
export function register(data) {
  const { email, password } = data;
  return auth.createUserWithEmailAndPassword(email, password).catch(error => {
    throw error;
  });
}

// response = {user}
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

const roles = {
  admin: 'admin',
  officer: 'officer',
  member: 'member',
  student: 'student'
};

export const authError = new Error('Unauthorized access');

export function isAdminOrOfficer(user) {
  const allowedRoles = [roles.admin, roles.officer];
  return checkAuthorization(user, allowedRoles);
}

export function isAdmin(user) {
  const allowedRoles = [roles.admin];
  return checkAuthorization(user, allowedRoles);
}

export function isOfficer(user) {
  const allowedRoles = [roles.officer];
  return checkAuthorization(user, allowedRoles);
}

export function isMember(user) {
  const allowedRoles = [roles.member];
  return checkAuthorization(user, allowedRoles);
}

export function isStudent(user) {
  const allowedRoles = [roles.student];
  return checkAuthorization(user, allowedRoles);
}

function checkAuthorization(user, allowedRoles) {
  if (!isLoggedIn || user == null) return false;
  for (const role of allowedRoles) {
    if (user.role === role) {
      return true;
    }
  }
  console.tron.log('does not match role');
  return false;
}
