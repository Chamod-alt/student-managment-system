const { db } = require('../config/db');
const Student = require('../models/studentModel');

const COLLECTION = 'students';

const addStudent = async (data) => {
  const student = new Student(...Object.values(data));
  await db.collection(COLLECTION).doc(student.studentId).set(student);
  return student;
};

const getAllStudents = async () => {
  const snapshot = await db.collection(COLLECTION).get();
  return snapshot.docs.map(doc => doc.data());
};

const getStudent = async (id) => {
  const doc = await db.collection(COLLECTION).doc(id).get();
  return doc.exists ? doc.data() : null;
};

const updateStudent = async (id, data) => {
  await db.collection(COLLECTION).doc(id).update(data);
  return getStudent(id);
};

const deleteStudent = async (id) => {
  await db.collection(COLLECTION).doc(id).delete();
  return { success: true };
};

module.exports = {
  addStudent,
  getAllStudents,
  getStudent,
  updateStudent,
  deleteStudent
};
