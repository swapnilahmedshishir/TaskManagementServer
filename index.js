import dotenv from "dotenv";
dotenv.config();
import express from "express";
import mongoose from "mongoose";
import cors from "cors";
import jwt from "jsonwebtoken";
import { Server } from "socket.io";
import http from "http";

const app = express();
const server = http.createServer(app);

const allowedOrigins = ["http://localhost:5173", "http://localhost:5174"];

app.use(
  cors({
    origin: (origin, callback) => {
      if (!origin || allowedOrigins.includes(origin)) {
        callback(null, true);
      } else {
        console.error(`CORS blocked for origin: ${origin}`);
        callback(new Error("Not allowed by CORS"));
      }
    },
    credentials: true,
  })
);

// Middleware
app.use(express.json());
app.use(cors());

// Connect to MongoDB  {
//   useNewUrlParser: true,
//   useUnifiedTopology: true,
// }
mongoose
  .connect(process.env.MONGO_URI)
  .then(() => console.log("MongoDB Connected"))
  .catch((err) => console.error("MongoDB Connection Error:", err));

// Task Schema & Model
const taskSchema = new mongoose.Schema({
  title: { type: String, required: true, maxlength: 50 },
  description: { type: String, maxlength: 200 },
  timestamp: { type: Date, default: Date.now },
  category: {
    type: String,
    enum: ["todo", "InProgress", "done"],
    required: true,
  },
  userId: { type: String, required: true },
  order: { type: Number, required: true },
});
const Task = mongoose.model("Task", taskSchema);

// WebSocket Setup
const io = new Server(server, {
  cors: {
    origin: allowedOrigins,
    credentials: true,
  },
});

io.on("connection", (socket) => {
  console.log("New client connected");
  socket.on("disconnect", () => console.log("Client disconnected"));
});

// Token verification middleware
const verifyToken = (req, res, next) => {
  const token = req?.headers?.authorization;
  if (!token) {
    return res
      .status(401)
      .send({ message: "Unauthorized. No token provided." });
  }
  const tokenString = token.split(" ")[1];
  jwt.verify(tokenString, process.env.ACCESS_TOKEN_SECRET, (err, decoded) => {
    if (err) {
      return res.status(401).send({ message: "Forbidden. Invalid token." });
    }
    req.decoded = decoded;
    next();
  });
};

// Auth API
app.post("/api/jwt", async (req, res) => {
  const user = req.body;
  const token = jwt.sign(user, process.env.ACCESS_TOKEN_SECRET, {
    expiresIn: "1d",
  });
  res
    .cookie("token", token, {
      httpOnly: true,
      secure: process.env.NODE_ENV === "production",
      sameSite: process.env.NODE_ENV === "production" ? "none" : "strict",
    })
    .send({ success: true, token });
});

// Routes
app.get("/", (req, res) => {
  res.send("Server is running");
});

app.post("/addtasks", async (req, res) => {
  try {
    const { title, description, category, userId } = req.body;

    if (!title || !category || !userId) {
      return res
        .status(400)
        .json({ error: "Title, category, and userId are required" });
    }
    console.log(req.body);

    // Find the last order number for the user's tasks
    const lastTask = await Task.findOne({ userId }).sort({ order: -1 });
    const task = new Task({
      ...req.body,
      order: lastTask ? lastTask.order + 1 : 1,
    });

    // const task = new Task(req.body);

    await task.save();
    io.emit("taskUpdated");
    res.status(201).json(task);
  } catch (error) {
    console.error("Error saving task:", error);
    res.status(400).json({ error: error.message });
  }
});

app.get("/tasksget", async (req, res) => {
  const { userId } = req.query;

  try {
    // const tasks = await Task.find({ userId });
    const tasks = await Task.find({ userId }).sort({ order: 1 });
    res.json(tasks);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

app.put("/tasks/:id", async (req, res) => {
  try {
    const updateData = { ...req.body };
    if (updateData.order === undefined) {
      delete updateData.order;
    }
    const task = await Task.findByIdAndUpdate(req.params.id, updateData, {
      new: true,
    });

    if (!task) {
      return res.status(404).json({ error: "Task not found" });
    }

    io.emit("taskUpdated");
    res.json(task);
  } catch (error) {
    console.error("Error updating task:", error);
    res.status(400).json({ error: error.message });
  }
});

app.delete("/tasks/:id", async (req, res) => {
  try {
    await Task.findByIdAndDelete(req.params.id);
    io.emit("taskUpdated");
    res.json({ message: "Task deleted" });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

const PORT = process.env.PORT || 5000;
server.listen(PORT, () => console.log(`Server running on port ${PORT}`));
