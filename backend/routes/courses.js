const express = require("express");
const fs = require("fs");
const path = require("path");
const router = express.Router();
const authMiddleware = require("../middleware/auth");

const COURSES_FILE = path.join(__dirname, "../data/courses.json");

// Load courses from JSON
const loadCourses = () => {
    try {
        const data = fs.readFileSync(COURSES_FILE, "utf8").trim();
        return data ? JSON.parse(data) : [];
    } catch (error) {
        console.error("Error reading courses.json:", error);
        return [];
    }
};

// Save courses to JSON
const saveCourses = (courses) => {
    fs.writeFileSync(COURSES_FILE, JSON.stringify(courses, null, 2), "utf-8");
};

// Get a single course by ID
router.get("/:id", (req, res) => {
    const courses = loadCourses();
    const course = courses.find((c) => c.id === req.params.id);

    if (!course) {
        return res.status(404).json({ error: "Course not found" });
    }

    res.json(course);
});

// Update a course
router.put("/:id", authMiddleware, (req, res) => {
    const courses = loadCourses();
    const { id } = req.params;
    const { name, description, subject, credits } = req.body;
    const userId = req.user.id;

    // Find course
    const courseIndex = courses.findIndex((c) => c.id === id);
    if (courseIndex === -1) {
        return res.status(404).json({ error: "Course not found" });
    }

    // Ensure the user is the course creator
    if (courses[courseIndex].createdBy !== userId) {
        return res.status(403).json({ error: "You do not have permission to edit this course" });
    }

    // Update course data
    courses[courseIndex] = {
        ...courses[courseIndex],
        name: name || courses[courseIndex].name,
        description: description || courses[courseIndex].description,
        subject: subject || courses[courseIndex].subject,
        credits: credits || courses[courseIndex].credits,
    };

    saveCourses(courses);
    res.json({ message: "Course updated successfully", course: courses[courseIndex] });
});

module.exports = router;
