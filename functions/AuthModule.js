exports.assignUserRole = (functions, admin) => {
  return functions.auth.user().onCreate(event => {
    const user = event; // The Firebase user.
    // Check if user meets role criteria.
    if (user.email) {
      let customClaims;
      if (user.email.indexOf("@utexas.edu") !== -1) {
        customClaims = {
          member: true
        };
      } else if (user.email.indexOf("@stu.austinisd.org") !== -1) {
        customClaims = {
          student: true
        };
      } else {
        customClaims = {
          guest: true
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

exports.changeUserRole = (functions, admin) => {
  return functions.https.onRequest((req, res) => {
    if (!req.body.uid) {
      return res.status(422).send({ error: "Bad Input" });
    }
    // Set custom user claims
    return admin
      .auth()
      .setCustomUserClaims(req.body.uid, { role: req.body.role })
      .then(() => {
        console.log(`Assigned user ${req.body.uid} the role: ${req.body.role}`);
        res.send(`Assigned user ${req.body.uid} the role: ${req.body.role}`);
        return true;
      })
      .catch(error => {
        console.error(error);
        res.status(422).send({ error });
        return false;
      });
  });
};
