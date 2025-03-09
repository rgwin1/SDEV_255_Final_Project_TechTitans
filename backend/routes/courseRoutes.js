const express = require("express");
const fs = require("fs");
const path = require("path");
const authMiddleware = require("../middleware/auth");
const router = express.Router();

const COURSES_FILE = path.join(__dirname, "../data/courses.json");

// Helper function to load courses from JSON
const loadCourses = () => {
    if (!fs.existsSync(COURSES_FILE)) return [];
    const data = fs.readFileSync(COURSES_FILE, "utf-8");
    return JSON.parse(data);
};

// Helper function to save courses to JSON
const saveCourses = (courses) => {
    fs.writeFileSync(COURSES_FILE, JSON.stringify(courses, null, 2));
};

// GET all courses
router.get("/", (req, res) => {
    try {
        const courses = loadCourses();
        res.json(courses);
    } catch (error) {
        console.error("Error loading courses:", error);
        res.status(500).json({ message: "Internal server error" });
    }
});

// GET a single course by ID
router.get("/:id", (req, res) => {
    try {
        const courses = loadCourses();
        const course = courses.find((c) => c.id === req.params.id);
        if (!course) return res.status(404).json({ message: "Course not found" });

        res.json(course);
    } catch (error) {
        console.error("Error fetching course:", error);
        res.status(500).json({ message: "Internal server error" });
    }
});

// POST a new course (Only authenticated teachers)
router.post("/", authMiddleware, (req, res) => {
    try {
        const { name, description, subject, credits } = req.body;
        const createdBy = req.user.id;

        if (!name || !description || !subject || !credits || !createdBy) {
            return res.status(400).json({ error: "All fields are required" });
        }

        const courses = loadCourses();
        const newCourse = {
            id: Date.now().toString(),
            name,
            description,
            subject,
            credits,
            createdBy,
        };

        courses.push(newCourse);
        saveCourses(courses);

        res.status(201).json({ message: "Course created successfully", course: newCourse });
    } catch (error) {
        console.error("Error creating course:", error);
        res.status(500).json({ message: "Internal server error" });
    }
});

// DELETE a course by ID (Only if created by the teacher)
router.delete("/:id", authMiddleware, (req, res) => {
    try {
        const courses = loadCourses();
        const courseIndex = courses.findIndex((c) => c.id === req.params.id && c.createdBy === req.user.id);

        if (courseIndex === -1) {
            return res.status(403).json({ error: "You don't have permission to delete this course." });
        }

        courses.splice(courseIndex, 1);
        saveCourses(courses);

        res.json({ message: "Course deleted successfully" });
    } catch (error) {
        console.error("Error deleting course:", error);
        res.status(500).json({ message: "Internal server error" });
    }
});

// UPDATE a course by ID (Only if created by the teacher)
router.put("/:id", authMiddleware, (req, res) => {
    try {
        const { name, description, subject, credits } = req.body;
        const courses = loadCourses();
        const course = courses.find((c) => c.id === req.params.id && c.createdBy === req.user.id);

        if (!course) {
            return res.status(403).json({ error: "You don't have permission to edit this course." });
        }

        course.name = name || course.name;
        course.description = description || course.description;
        course.subject = subject || course.subject;
        course.credits = credits || course.credits;

        saveCourses(courses);
        res.json({ message: "Course updated successfully", course });
    } catch (error) {
        console.error("Error updating course:", error);
        res.status(500).json({ message: "Internal server error" });
    }
});

module.exports = router;
