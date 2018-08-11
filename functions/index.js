// The Cloud Functions for Firebase SDK to create Cloud Functions and setup triggers.
const functions = require('firebase-functions');

// The Firebase Admin SDK to access the Firebase Realtime Database.
const admin = require('firebase-admin');

admin.initializeApp(functions.config().firebase);

// On sign up.
exports.processSignUp = functions.auth.user().onCreate(event => {
  const user = event.data; // The Firebase user.
  // Check if user meets role criteria.
  if (user.email &&
      user.emailVerified) {
        let customClaims;
        if (user.email.indexOf('@utexas.edu') !== -1) {
          customClaims = {
            role: 'member'
          };
        } else if (user.email.indexOf('@stu.austinisd.org') !== -1) {
          customClaims = {
            role: 'student'
          };
        }
    // Set custom user claims on this newly created user.
    return setCustomClaims();
  }
});

function setCustomClaims() {
  return admin.auth().setCustomUserClaims(user.uid, customClaims)
      // .then(() => {
      //   // Update real-time database to notify client to force refresh.
      //   const metadataRef = admin.database().ref("metadata/" + user.uid);
      //   // Set the refresh time to the current UTC timestamp.
      //   // This will be captured on the client to force a token refresh.
      //   return metadataRef.set({refreshTime: new Date().getTime()});
      // })
      .catch(error => {
        console.log(error);
      });
} 
