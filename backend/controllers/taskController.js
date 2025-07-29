const Task = require("../models/Task");

exports.getTasks = async (req, res) => {
  try {
    const tasks = await Task.find({ userId: req.user.id }).populate("subjectId", "name");
    res.json(tasks);
  } catch (err) {
    res.status(500).json({ error: "Error fetching tasks" });
  }
};

exports.addTask = async (req, res) => {
  const { title, dueDate, subjectId } = req.body;
  try {
    const task = new Task({ title, dueDate, subjectId, userId: req.user.id });
    await task.save();
    res.status(201).json(task);
  } catch (err) {
    res.status(500).json({ error: "Error creating task" });
  }
};

exports.updateTask = async (req, res) => {
  const { title, dueDate, completed, pomodoroCount } = req.body;
  try {
    const task = await Task.findOneAndUpdate(
      { _id: req.params.id, userId: req.user.id },
      { title, dueDate, completed, pomodoroCount },
      { new: true }
    );
    res.json(task);
  } catch (err) {
    res.status(500).json({ error: "Error updating task" });
  }
};

exports.deleteTask = async (req, res) => {
  try {
    await Task.findOneAndDelete({ _id: req.params.id, userId: req.user.id });
    res.json({ message: "Task deleted" });
  } catch (err) {
    res.status(500).json({ error: "Error deleting task" });
  }
};
