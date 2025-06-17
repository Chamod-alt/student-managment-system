const express = require("express");
const router = express.Router();
const studentController = require("../controllers/studentController");
const multer = require("multer");

// File upload setup
const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, "uploads/");
  },
  filename: (req, file, cb) => {
    cb(null, Date.now() + "-" + file.originalname);
  },
});
const upload = multer({ storage });

router.post("/", upload.single("picture"), studentController.createStudent);
router.get("/", studentController.getStudents);
router.delete("/:id", studentController.deleteStudent);
router.put("/:id", upload.single("picture"), studentController.updateStudent);

module.exports = router;
