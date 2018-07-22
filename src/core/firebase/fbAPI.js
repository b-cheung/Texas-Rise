import { auth, firestore } from '../../core/firebase/FirebaseConfig';

// Register user
export function register(data, callback) {
  const { email, password } = data;
  auth
    .createUserWithEmailAndPassword(email, password)
    .then(user => createUser(data, user, callback))
    .catch(() => callback(false, null, 'Registration failed.'));
}

// Create user in firestore
export function createUser(data, user, callback) {
  const { firstName, lastName, year, email, role } = data;
  firestore
    .collection('users')
    .doc(user.uid)
    .set({
      uid: user.uid,
      email,
      firstName,
      lastName,
      role,
      year
    })
    .then(() => getUser(user, callback))
    .catch(() => callback(false, null, 'Unable to create user.'));
}

// Login user
export function login(data, callback) {
  const { email, password } = data;
  auth
    .signInWithEmailAndPassword(email, password)
    .then(user => getUser(user, callback))
    .catch(() => callback(false, null, 'Authentication failed.'));
}

// Get user in firestore
export function getUser(user, callback) {
  firestore
    .collection('users')
    .doc(user.uid)
    .get()
    .then(doc => {
      if (doc.exists) {
        callback(true, doc.data(), null);
      } else {
        // doc.data() will be undefined in this case
        callback(false, null, 'No such document.');
      }
    })
    .catch(error => {
      console.log('Error getting document:', error);
      callback(false, null, 'Error getting document.');
    });
}

// Logout user
export function logout() {
  auth.signOut();
}
