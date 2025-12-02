const express = require("express");
const Task = require("../models/Task");
const auth = require("../middleware/auth"); // <-- sirf ek hi baar

const router = express.Router();

// CREATE a task
router.post("/", auth, async (req, res) => {
  try {
    const task = await Task.create({
      ...req.body,
      user: req.user.id, // logged-in user
    });
    res.status(201).json(task);
  } catch (err) {
    res
      .status(400)
      .json({ message: "Error creating task", error: err.message });
  }
});

// READ all tasks (user-specific)
router.get("/", auth, async (req, res) => {
  try {
    const { status } = req.query;
    let filter = { user: req.user.id };

    if (status === "completed") filter.isCompleted = true;
    if (status === "pending") filter.isCompleted = false;

    const tasks = await Task.find(filter).sort({ createdAt: -1 });
    res.json(tasks);
  } catch (err) {
    res
      .status(500)
      .json({ message: "Error fetching tasks", error: err.message });
  }
});

// READ single task
router.get("/:id", auth, async (req, res) => {
  try {
    const task = await Task.findOne({
      _id: req.params.id,
      user: req.user.id,
    });
    if (!task) return res.status(404).json({ message: "Task not found" });
    res.json(task);
  } catch (err) {
    res
      .status(500)
      .json({ message: "Error fetching task", error: err.message });
  }
});

// UPDATE task
router.put("/:id", auth, async (req, res) => {
  try {
    const task = await Task.findOneAndUpdate(
      { _id: req.params.id, user: req.user.id },
      req.body,
      { new: true }
    );
    if (!task) return res.status(404).json({ message: "Task not found" });
    res.json(task);
  } catch (err) {
    res
      .status(400)
      .json({ message: "Error updating task", error: err.message });
  }
});

// TOGGLE complete
router.patch("/:id/complete", auth, async (req, res) => {
  try {
    const task = await Task.findOne({
      _id: req.params.id,
      user: req.user.id,
    });
    if (!task) return res.status(404).json({ message: "Task not found" });

    task.isCompleted = !task.isCompleted;
    await task.save();
    res.json(task);
  } catch (err) {
    res
      .status(400)
      .json({ message: "Error updating task", error: err.message });
  }
});

// DELETE
router.delete("/:id", auth, async (req, res) => {
  try {
    const task = await Task.findOneAndDelete({
      _id: req.params.id,
      user: req.user.id,
    });
    if (!task) return res.status(404).json({ message: "Task not found" });
    res.json({ message: "Task deleted" });
  } catch (err) {
    res
      .status(500)
      .json({ message: "Error deleting task", error: err.message });
  }
});

module.exports = router;
