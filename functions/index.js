const functions = require('firebase-functions');
const admin = require('firebase-admin');
const assignUserRole = require('./assignUserRole');

// const serviceAccount = require('./texas-rise-service-account.json')
// admin.initializeApp({
//   credential: admin.credential.cert(serviceAccount),
//   databaseURL: "https://texas-rise.firebaseio.com"
// });
admin.initializeApp(functions.config().firebase);

// exports.assignUserRole = functions.https.onRequest(assignUserRole);
exports.assignUserRole =functions.auth.user().onCreate(assignUserRole);
