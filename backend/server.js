const express = require("express");
const cors = require("cors");
const fs = require("fs");
const path = require("path");

const app = express();
const PORT = process.env.PORT || 5000;

// ✅ CORS Configuration - Allows frontend to communicate properly
app.use(cors({
    origin: "http://localhost:5173", // Update this to match your frontend URL
    credentials: true
}));

app.use(express.json());

// ✅ Ensure `data/` directory and `courses.json` exist
const DATA_DIR = path.join(__dirname, "data");
const COURSES_FILE = path.join(DATA_DIR, "courses.json");

if (!fs.existsSync(DATA_DIR)) {
    fs.mkdirSync(DATA_DIR);
}

if (!fs.existsSync(COURSES_FILE)) {
    fs.writeFileSync(COURSES_FILE, "[]"); // Create empty courses.json if missing
}

// ✅ Import Routes
const authRoutes = require("./routes/auth");
const courseRoutes = require("./routes/courses");

// ✅ Use Routes
app.use("/api/auth", authRoutes);
app.use("/api/courses", courseRoutes);

// ✅ Start Server
app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
});
