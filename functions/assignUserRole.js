const admin = require('firebase-admin');

// module.exports = function(req, res) {
//   res.send(req.body)
// }

// On register.
module.exports = event => {
  const user = event; // The Firebase user.
  // Check if user meets role criteria.
  if (user.email) {
        let customClaims;
        if (user.email.indexOf('@utexas.edu') !== -1) {
          customClaims = {
            role: 'member'
          };
        } else if (user.email.indexOf('@stu.austinisd.org') !== -1) {
          customClaims = {
            role: 'student'
          };
        } else {
          customClaims = {
            role: 'guest'
          };
        }
    // Set custom user claims on this newly created user.
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
};

// function setCustomClaims(user, customClaims) {
//   return admin.auth().setCustomUserClaims(user.uid, customClaims)
//       // .then(() => {
//       //   // Update real-time database to notify client to force refresh.
//       //   const metadataRef = admin.database().ref("metadata/" + user.uid);
//       //   // Set the refresh time to the current UTC timestamp.
//       //   // This will be captured on the client to force a token refresh.
//       //   return metadataRef.set({refreshTime: new Date().getTime()});
//       // })
//       .catch(error => {
//         console.log(error);
//       });
// } 
