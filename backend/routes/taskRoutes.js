const express = require("express");
const Task = require("../models/Task");

const router = express.Router();

// CREATE a task
router.post("/", async (req, res) => {
  try {
    const task = await Task.create(req.body);
    res.status(201).json(task);
  } catch (err) {
    res.status(400).json({ message: "Error creating task", error: err.message });
  }
});

// READ all tasks (with optional filter)
router.get("/", async (req, res) => {
  try {
    const { status } = req.query; // status = "completed" / "pending"
    let filter = {};
    if (status === "completed") filter.isCompleted = true;
    if (status === "pending") filter.isCompleted = false;

    const tasks = await Task.find(filter).sort({ createdAt: -1 });
    res.json(tasks);
  } catch (err) {
    res.status(500).json({ message: "Error fetching tasks", error: err.message });
  }
});

// READ single task
router.get("/:id", async (req, res) => {
  try {
    const task = await Task.findById(req.params.id);
    if (!task) return res.status(404).json({ message: "Task not found" });
    res.json(task);
  } catch (err) {
    res.status(500).json({ message: "Error fetching task", error: err.message });
  }
});

// UPDATE task (full update)
router.put("/:id", async (req, res) => {
  try {
    const task = await Task.findByIdAndUpdate(req.params.id, req.body, {
      new: true,
    });
    if (!task) return res.status(404).json({ message: "Task not found" });
    res.json(task);
  } catch (err) {
    res.status(400).json({ message: "Error updating task", error: err.message });
  }
});

// PATCH: mark as completed / toggle completed
router.patch("/:id/complete", async (req, res) => {
  try {
    const task = await Task.findById(req.params.id);
    if (!task) return res.status(404).json({ message: "Task not found" });

    task.isCompleted = !task.isCompleted;
    await task.save();
    res.json(task);
  } catch (err) {
    res.status(400).json({ message: "Error updating task", error: err.message });
  }
});

// DELETE task
router.delete("/:id", async (req, res) => {
  try {
    const task = await Task.findByIdAndDelete(req.params.id);
    if (!task) return res.status(404).json({ message: "Task not found" });
    res.json({ message: "Task deleted" });
  } catch (err) {
    res.status(500).json({ message: "Error deleting task", error: err.message });
  }
});

module.exports = router;
