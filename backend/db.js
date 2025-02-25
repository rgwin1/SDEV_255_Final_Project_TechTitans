const mongoose = require('mongoose');

const dbURI = "mongodb+srv://group3:sdev255fp@courses.jxewq.mongodb.net/?retryWrites=true&w=majority&appName=Courses"



const connectDB = async () => {
    try {
      await mongoose.connect(dbURI, {
        dbName: "Courses" // 🔹 Explicitly set the correct database
      });
    console.log("MongoDB Connected");
  } catch (err) {
    console.error("MongoDB Connection Error:", err);
    process.exit(1); // Exit process if connection fails
  }
};

module.exports = connectDB;



