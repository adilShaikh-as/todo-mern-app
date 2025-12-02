// server.js
const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
require("dotenv").config();

// 1️⃣ Pehle app create karo
const app = express();

// 2️⃣ Middlewares
app.use(
  cors({
    origin: [
      "http://localhost:5173",
      "https://todo-mern-app-amber.vercel.app"
    ],
    methods: ["GET", "POST", "PUT", "PATCH", "DELETE"],
    allowedHeaders: ["Content-Type", "Authorization"]
  })
);
app.use(express.json());

// 3️⃣ Routes import karo
const authRoutes = require("./routes/authRoutes");
const taskRoutes = require("./routes/taskRoutes");

// 4️⃣ Routes use karo
app.use("/api/auth", authRoutes);
app.use("/api/tasks", taskRoutes);

// 5️⃣ MongoDB connection
const MONGO_URI =
  process.env.MONGO_URI || "mongodb://127.0.0.1:27017/todo_db";

mongoose
  .connect(MONGO_URI)
  .then(() => console.log("✅ Connected to MongoDB"))
  .catch((err) => console.error("MongoDB connection error:", err));

// 6️⃣ Test route
app.get("/", (req, res) => {
  res.send("To-Do API is running...");
});

// 7️⃣ Start server
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`🚀 Server running on http://localhost:${PORT}`);
});
