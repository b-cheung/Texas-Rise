exports.assignUserRole = (functions, admin) => {
  return functions.auth.user().onCreate(event => {
    const user = event; // The Firebase user.
    // Check if user meets role criteria.
    if (user.email) {
      let customClaims;
      if (user.email.indexOf("@utexas.edu") !== -1) {
        customClaims = {
          role: "member"
        };
      } else if (user.email.indexOf("@stu.austinisd.org") !== -1) {
        customClaims = {
          role: "student"
        };
      } else {
        customClaims = {
          role: "guest"
        };
      }
      // Set custom user claims on this newly created user.
      return admin
        .auth()
        .setCustomUserClaims(user.uid, customClaims)
        .then(() => {
          console.log(
            `Assigned user ${user.email} the role: ${customClaims.role}`
          );
          return true;
        })
        .catch(error => {
          console.error(error);
          return false;
        });
    }
    return false;
  });
};
