const express = require('express');
const admin = require('firebase-admin');
const app = express();

const serviceAccount = require('./path-to-your-service-account.json'); // update with actual path

admin.initializeApp({
  credential: admin.credential.cert(serviceAccount)
});

const db = admin.firestore();

app.get('/', async (req, res) => {
  await db.collection('students').add({
    name: 'Test Student',
    age: 20,
    registered: true
  });

  res.send('Added test student to Firestore!');
});

const PORT = 3000;
app.listen(PORT, () => console.log(`Server running on http://localhost:${PORT}`));
