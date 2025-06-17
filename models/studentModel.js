const db = require("../config/db");

const createStudentTable = () => {
  const sql = `
    CREATE TABLE IF NOT EXISTS students (
      id INT AUTO_INCREMENT PRIMARY KEY,
      studentId VARCHAR(50) NOT NULL,
      studentName VARCHAR(100) NOT NULL,
      picture VARCHAR(255),
      className VARCHAR(50),
      contactNumber VARCHAR(20),
      motherName VARCHAR(100),
      fatherName VARCHAR(100)
    )
  `;

  db.query(sql, (err, result) => {
    if (err) {
      console.error(" Failed to create table:", err);
    } else {
      console.log("Students table is ready.");
    }
  });
};

module.exports = createStudentTable;
