const admin = require("firebase-admin");

// Load service account key
const serviceAccount = require("./serviceAccountKey.json");

// Initialize Firebase Admin SDK
admin.initializeApp({
  credential: admin.credential.cert(serviceAccount),
});

// Firestore reference
const db = admin.firestore();

// Add test document to Firestore
async function createTestCollection() {
  try {
    const res = await db.collection("students").add({
      name: "Test User",
      age: 21,
      enrolled: true,
      createdAt: new Date()
    });

    console.log("✅ Firestore created! Document ID:", res.id);
  } catch (err) {
    console.error("❌ Error creating document:", err);
  }
}

createTestCollection();
