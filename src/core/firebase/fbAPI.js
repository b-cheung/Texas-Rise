import { auth, firestore } from '../../core/firebase/FirebaseConfig';

export function getCurrentUser() {
  const user = auth.currentUser;
  console.log('getCurrentUser', user);
  return user;
}

// callback(success, error)
// Register user
export function register(data, callback) {
  const { email, password } = data;
  auth
    .createUserWithEmailAndPassword(email, password)
    .then(user => createUser(data, user.user, callback))
    .catch(() => callback(false, 'Registration failed.'));
}

// Create user in firestore
export function createUser(data, authUser, callback) {
  console.log('createUser', authUser.uid);
  const { firstName, lastName, year, email, role } = data;
  firestore
    .collection('users')
    .doc(authUser.uid)
    .set({
      uid: authUser.uid,
      email,
      firstName,
      lastName,
      role,
      year
    })
    .then(() => callback(true, null))
    .catch(() => callback(false, 'Unable to create user.'));
}

// Login user
export function login(data, callback) {
  const { email, password } = data;
  console.log(email, password);
  auth
    .signInWithEmailAndPassword(email, password)
    .then(user => callback(true, null))
    .catch(() => callback(false, 'Authentication failed.'));
}

// callback(success, user, error)
// Get user in firestore
export function getUser(authUser, callback) {
  console.log('getUser', authUser.uid);
  firestore
    .collection('users')
    .doc(authUser.uid)
    .get()
    .then(doc => {
      if (doc.exists) {
        console.log('doc exists');
        callback(true, { ...doc.data(), authUser }, null);
      } else {
        // doc.data() will be undefined in this case
        console.log('No such document');
        callback(false, null, 'No such document.');
      }
    })
    .catch(error => {
      console.log('Error getting document:', error);
      callback(false, null, 'Error getting document.');
    });
}

// Logout user
export function logout(callback) {
  auth
    .signOut()
    .then(() => callback(true, null))
    .catch(() => callback(false, 'Unable to logout.'));
}
