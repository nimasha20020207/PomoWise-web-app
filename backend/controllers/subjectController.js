const Subject = require("../models/Subject");

exports.getSubjects = async (req, res) => {
  try {
    const subjects = await Subject.find({ userId: req.user.id });
    res.json(subjects);
  } catch (err) {
    res.status(500).json({ error: "Error getting subjects" });
  }
};

exports.addSubject = async (req, res) => {
  const { name } = req.body;
  try {
    const subject = new Subject({ name, userId: req.user.id });
    await subject.save();
    res.status(201).json(subject);
  } catch (err) {
    res.status(500).json({ error: "Error creating subject" });
  }
};

exports.deleteSubject = async (req, res) => {
  try {
    await Subject.findOneAndDelete({ _id: req.params.id, userId: req.user.id });
    res.json({ message: "Subject deleted" });
  } catch (err) {
    res.status(500).json({ error: "Error deleting subject" });
  }
};
