/*const admin = require("firebase-admin");
const serviceAccount = require("../firebaseServiceKey.json");

admin.initializeApp({
  credential: admin.credential.cert(serviceAccount)
});

const db = admin.firestore();
module.exports = db;
*/
// firebase.js (for frontend using Firebase Web SDK)
import { initializeApp } from 'firebase/app';
import { getFirestore } from 'firebase/firestore';

// ✅ Your correct Firebase config
const firebaseConfig = {
  apiKey: "AIzaSyC0tm-hP890Lxx4y78ZIY4UxXi91rL-Az0",
  authDomain: "student-register-68c1c.firebaseapp.com",
  projectId: "student-register-68c1c",
  storageBucket: "student-register-68c1c.appspot.com", // ✅ corrected to appspot.com
  messagingSenderId: "739054882501",
  appId: "1:739054882501:web:8e530ad8d42ba02e5eeaac",
  measurementId: "G-ZE4WT2RZ7X"
};

// ✅ Initialize Firebase
const app = initializeApp(firebaseConfig);

// ✅ Initialize Firestore
const db = getFirestore(app);

// ✅ Export Firestore instance
export default db;
