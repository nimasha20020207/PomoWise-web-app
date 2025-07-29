const mongoose = require("mongoose");

const TaskSchema = new mongoose.Schema({
  title: { type: String, required: true },
  dueDate: { type: Date },
  completed: { type: Boolean, default: false },
  pomodoroCount: { type: Number, default: 0 },
  subjectId: { type: mongoose.Schema.Types.ObjectId, ref: "Subject" },
  userId: { type: mongoose.Schema.Types.ObjectId, ref: "User", required: true },
});

module.exports = mongoose.model("Task", TaskSchema);
