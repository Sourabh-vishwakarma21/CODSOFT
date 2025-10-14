
// -------------------- IMPORTS --------------------
import express from "express";
import mongoose from "mongoose";
import cors from "cors";
import dotenv from "dotenv";
import bcrypt from "bcryptjs"; // For password hashing
import multer from "multer";
import path from "path";
import { fileURLToPath } from "url";
import User from "./models/User.js";
import Job from "./models/Job.js";

// -------------------- CONFIG --------------------
dotenv.config();
const app = express();
const PORT = process.env.PORT || 5000;

// -------------------- MIDDLEWARE --------------------
app.use(cors());
app.use(express.json());

// -------------------- MONGO CONNECTION --------------------
mongoose
  .connect(process.env.MONGO_URI)
  .then(() => console.log("✅ MongoDB connected"))
  .catch((err) => console.log("❌ MongoDB error:", err));

// -------------------- FILE UPLOAD SETUP --------------------
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const storage = multer.diskStorage({
  destination: path.join(__dirname, "/uploads"),
  filename: (req, file, cb) => {
    cb(null, Date.now() + "-" + file.originalname);
  },
});

const upload = multer({ storage });
app.use("/uploads", express.static(path.join(__dirname, "uploads")));

// -------------------- RESUME MODEL --------------------
const resumeSchema = new mongoose.Schema({
  userId: { type: mongoose.Schema.Types.ObjectId, ref: "User", required: true },
  fileName: { type: String, required: true },
  filePath: { type: String, required: true },
  fileUrl: { type: String, required: true },
  fileType: String,
  fileSize: Number,
  uploadedAt: { type: Date, default: Date.now },
});
const Resume = mongoose.model("Resume", resumeSchema);

// -------------------- ROUTES --------------------

// 👉 Test route
app.get("/", (req, res) => {
  res.send("Job Board API is running...");
});

// -------------------- USER REGISTER --------------------
app.post("/api/register", async (req, res) => {
  try {
    const { name, email, password } = req.body;

    const existingUser = await User.findOne({ email });
    if (existingUser)
      return res.status(400).json({ message: "User already exists" });

    const hashedPassword = await bcrypt.hash(password, 10);
    const newUser = new User({ name, email, password: hashedPassword });
    await newUser.save();

    res.status(201).json({ message: "User registered successfully" });
  } catch (err) {
    res.status(500).json({ message: "Server error", error: err.message });
  }
});

// -------------------- USER LOGIN --------------------
app.post("/api/login", async (req, res) => {
  try {
    const { email, password } = req.body;

    const user = await User.findOne({ email });
    if (!user) return res.status(400).json({ message: "User not found" });

    const validPassword = await bcrypt.compare(password, user.password);
    if (!validPassword)
      return res.status(400).json({ message: "Invalid credentials" });

    res.json({ message: "Login successful", user });
  } catch (err) {
    res.status(500).json({ message: "Server error", error: err.message });
  }
});

// -------------------- JOB POST --------------------
app.post("/api/jobs", async (req, res) => {
  try {
    const { title, description, company, location } = req.body;
    const newJob = new Job({ title, description, company, location });
    await newJob.save();
    res.status(201).json({ message: "Job posted successfully" });
  } catch (err) {
    res.status(500).json({ message: "Error posting job", error: err.message });
  }
});

// -------------------- GET ALL JOBS --------------------
app.get("/api/jobs", async (req, res) => {
  try {
    const jobs = await Job.find();
    res.json(jobs);
  } catch (err) {
    res.status(500).json({ message: "Error fetching jobs", error: err.message });
  }
});

// -------------------- RESUME UPLOAD --------------------
app.post("/api/upload-resume", upload.single("resume"), async (req, res) => {
  try {
    if (!req.file)
      return res.status(400).json({ message: "No file uploaded" });

    // ⚠️ For now using static userId (replace later with actual logged-in user ID)
    const userId = req.body.userId || "670fe59cf1a9d9a3b2c1e123"; 

    const fileUrl = `http://localhost:${PORT}/uploads/${req.file.filename}`;

    const newResume = new Resume({
      userId,
      fileName: req.file.originalname,
      filePath: req.file.path,
      fileUrl,
      fileType: req.file.mimetype.split("/")[1],
      fileSize: req.file.size,
    });

    await newResume.save();
    res.json({
      message: "✅ Resume uploaded successfully!",
      fileUrl,
      fileName: req.file.originalname,
    });
  } catch (error) {
    console.error("❌ Upload Error:", error);
    res.status(500).json({ message: "Error uploading resume" });
  }
});

// -------------------- SERVER START --------------------
app.listen(PORT, () =>
  console.log(`🚀 Server running on http://localhost:${PORT}`)
);
