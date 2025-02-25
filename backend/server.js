const express = require("express");
const cors = require("cors");
const connectDB = require("./db"); // Import the DB connection
const courseRoutes = require('./routes/courseRoutes');

const app = express();
const PORT = 3000;

// Middleware
app.use(express.json());
app.use(cors());


app.use("/api/courses", courseRoutes);

// Connect to MongoDB
connectDB();

// Simple Route
app.get("/", (req, res) => {
  res.send("API is running...");
});

// Start Server
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});