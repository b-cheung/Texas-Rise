const { google } = require("googleapis");

exports.appendUserToSheets = functions => {
  return functions.firestore
    .document("users/{uid}")
    .onCreate((snap, context) => {
      // Get an object representing the document
      const docData = snap.data();

      // access a particular field as you would any JS property
      const firstName = docData.firstName;
      const lastName = docData.lastName;
      const email = docData.email;
      const year = docData.year;
      const uid = context.params.uid;
      const role = docData.role;
      let sheet = getSheet(role);

      // perform desired operations ...
      var jwt = getJwt();
      var apiKey = getApiKey();
      var spreadsheetId = "1HDTdyAHNyBLZX_dt5yLeASL3oW_MP32SXSaSZFXBs_g";
      var range = `${sheet}!A1`;
      var row = [firstName, lastName, email, year, uid];
      return appendSheetRow(jwt, apiKey, spreadsheetId, range, row);
    });
};

function getSheet(role) {
  return role.charAt(0).toUpperCase() + role.slice(1) + "s";
}

function getJwt() {
  var credentials = require("./credentials/firestore-sheets-sync-service-account.json");

  return new google.auth.JWT(
    credentials.client_email,
    null,
    credentials.private_key,
    ["https://www.googleapis.com/auth/spreadsheets"]
  );
}

function getApiKey() {
  var apiKeyFile = require("./credentials/firestore-sheets-sync-api-key.json");

  return apiKeyFile.key;
}

function appendSheetRow(jwt, apiKey, spreadsheetId, range, row) {
  const sheets = google.sheets({ version: "v4" });
  return sheets.spreadsheets.values
    .append({
      spreadsheetId: spreadsheetId,
      range: range,
      auth: jwt,
      key: apiKey,
      valueInputOption: "RAW",
      resource: { values: [row] }
    })
    .then(response => {
      console.log(
        `Updated sheet: ${response.result.data.updates.updatedRange}`
      );
      return true;
    })
    .catch(error => {
      console.log(error);
      return false;
    });
}
