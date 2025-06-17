const db = require("../config/db");

 exports.createStudent = (req, res) => {
  const { studentId, studentName, className, contactNumber, motherName, fatherName } = req.body;
  const picture = req.file ? req.file.filename : null; // multer gives `req.file`

  const sql = `
    INSERT INTO students (studentId, studentName, picture, className, contactNumber, motherName, fatherName)
    VALUES (?, ?, ?, ?, ?, ?, ?)
  `;
  const values = [studentId, studentName, picture, className, contactNumber, motherName, fatherName];

  db.query(sql, values, (err, result) => {
    if (err) {
      console.error("Error inserting student:", err);
      return res.status(500).json({ error: 'Database error' });
    }
    res.status(201).json({ message: 'Student registered successfully' });
  });
};

exports.getStudents = (req, res) => {
  db.query("SELECT * FROM students", (err, results) => {
    if (err) return res.status(500).json({ error: "Failed to fetch students" });
    res.json(results);
  });
};

exports.deleteStudent = (req, res) => {
  const id = req.params.id;
  db.query("DELETE FROM students WHERE id = ?", [id], (err, result) => {
    if (err) return res.status(500).json({ error: "Failed to delete student" });
    res.json({ message: "Student deleted successfully" });
  });
};

exports.updateStudent = (req, res) => {
  const id = req.params.id;
  const { studentId, studentName, className, contactNumber, motherName, fatherName } = req.body;
  const picture = req.file ? req.file.filename : null;

  let sql = `UPDATE students SET studentId=?, studentName=?, className=?, contactNumber=?, motherName=?, fatherName=?`;
  const params = [studentId, studentName, className, contactNumber, motherName, fatherName];

  if (picture) {
    sql += `, picture=?`;
    params.push(picture);
  }

  sql += ` WHERE id=?`;
  params.push(id);

  db.query(sql, params, (err, result) => {
    if (err) return res.status(500).json({ error: "Failed to update student" });
    res.json({ message: "Student updated successfully" });
  });
};
