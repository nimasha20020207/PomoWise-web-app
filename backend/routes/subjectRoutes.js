const express = require("express");
const router = express.Router();
const { getSubjects, addSubject, deleteSubject } = require("../controllers/subjectController");
const authMiddleware = require("../middleware/authMiddleware");

router.use(authMiddleware); // Protect all routes

router.get("/", getSubjects);
router.post("/", addSubject);
router.delete("/:id", deleteSubject);

module.exports = router;
