const express = require("express");
const cors = require("cors");
const studentRoutes = require("./routes/studentRoutes");
const createStudentTable = require("./models/initModel"); 

const app = express();
const PORT = 5000;

app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use("/uploads", express.static("uploads"));

// Run DB table creation
createStudentTable();

// Routes
app.use("/api/students", studentRoutes);

app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
