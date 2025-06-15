const admin = require('firebase-admin');
const serviceAccount = require('./AIzaSyC0tm-hP890Lxx4y78ZIY4UxXi91rL-Az0.json');

admin.initializeApp({
  credential: admin.credential.cert(serviceAccount),
  databaseURL: 'https://<students>.firebaseio.com' // for Realtime Database
  // OR
  // Replace the above line with nothing if using Firestore only
});

const db = admin.database(); // Realtime Database
// OR for Firestore
// const db = admin.firestore();
