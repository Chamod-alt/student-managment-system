const express = require('express');
const cors = require('cors');
const studentRoutes = require('./routes/studentRoutes');
const createStudentTable = require('./models/studentModel');
const db = require('./config/db');

const app = express();
app.use(cors());
app.use(express.json());
app.use('/api/students', studentRoutes);
app.use('/uploads', express.static('uploads'));


//  Call this after DB is connected
db.connect((err) => {
  if (err) {
    console.error('Database connection failed:', err);
    return;
  }
  console.log('Connected to MySQL database.');

  // 🔥 Create the table after connection
  createStudentTable();

  app.listen(5000, () => {
    console.log(' Server running on http://localhost:5000');
  });
});
