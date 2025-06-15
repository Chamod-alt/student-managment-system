const db = require('../firebase/config');
const collection = db.collection('students');

const createStudent = async (data) => {
  const docRef = await collection.add(data);
  return { id: docRef.id, ...data };
};

const getAllStudents = async () => {
  const snapshot = await collection.get();
  return snapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));
};

const getStudentById = async (id) => {
  const doc = await collection.doc(id).get();
  return doc.exists ? { id: doc.id, ...doc.data() } : null;
};

const updateStudent = async (id, data) => {
  await collection.doc(id).update(data);
  const updatedDoc = await collection.doc(id).get();
  return { id: updatedDoc.id, ...updatedDoc.data() };
};

const deleteStudent = async (id) => {
  await collection.doc(id).delete();
  return true;
};

module.exports = {
  createStudent,
  getAllStudents,
  getStudentById,
  updateStudent,
  deleteStudent
};
