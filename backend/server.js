const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
require("dotenv").config();

const app = express();

// Middlewares
app.use(cors());
app.use(express.json());

// Mongo URI (use your own from MongoDB Atlas or local)
const MONGO_URI = process.env.MONGO_URI || "mongodb://127.0.0.1:27017/todo_db";

// Connect to MongoDB
mongoose
  .connect(MONGO_URI)
  .then(() => console.log("✅ Connected to MongoDB"))
  .catch((err) => console.error("MongoDB connection error:", err));

// Basic test route
app.get("/", (req, res) => {
  res.send("To-Do API is running...");
});

// Import task routes
const taskRoutes = require("./routes/taskRoutes");
app.use("/api/tasks", taskRoutes);

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`🚀 Server running on http://localhost:${PORT}`);
});
