const express = require("express");
const fs = require("fs");
const path = require("path");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");

const router = express.Router();

const USERS_FILE = path.join(__dirname, "../data/users.json");

// Ensure users.json exists
if (!fs.existsSync(USERS_FILE)) {
    fs.writeFileSync(USERS_FILE, "[]"); // Initialize empty array
}

// **Load Users from JSON File**
const loadUsers = () => {
    try {
        const data = fs.readFileSync(USERS_FILE, "utf8");
        console.log("Loaded users.json:", data); // Add this
        return JSON.parse(data);
    } catch (error) {
        console.error("Error reading users.json:", error);
        return [];
    }
};

// **Save Users to JSON File**
const saveUsers = (users) => {
    try {
        console.log("Saving users:", JSON.stringify(users, null, 2)); // Add this
        fs.writeFileSync(USERS_FILE, JSON.stringify(users, null, 2));
        console.log("users.json updated!");
    } catch (error) {
        console.error("Error writing to users.json:", error);
    }
};

// **SIGNUP Route**
router.post("/signup", async (req, res) => {
    console.log("Received sign-up request:", req.body);

    try {
        const { username, password, confirmPassword, firstname, lastname, email, role } = req.body;

        if (!username || !password || !confirmPassword || !firstname || !lastname || !email || !role) {
            console.error("Missing fields in request!");
            return res.status(400).json({ message: "All fields are required" });
        }

        if (password !== confirmPassword) {
            console.error("Passwords do not match!");
            return res.status(400).json({ message: "Passwords do not match" });
        }

        if (!["student", "teacher"].includes(role)) {
            console.error("Invalid role:", role);
            return res.status(400).json({ message: "Invalid role" });
        }

        let users = loadUsers();
        console.log("Existing users before signup:", users);

        if (users.some(user => user.username === username || user.email === email)) {
            console.error("Username or email already exists:", username, email);
            return res.status(400).json({ message: "Username or email already in use" });
        }

        const hashedPassword = await bcrypt.hash(password, 10);
        const newUser = {
            id: Date.now().toString(), 
            username,
            password: hashedPassword,
            firstname,
            lastname,
            email,
            role
        };

        users.push(newUser);
        saveUsers(users);

        console.log("New user created:", newUser);
        res.status(201).json({ message: "User registered successfully" });

    } catch (error) {
        console.error("Signup error:", error);
        res.status(500).json({ message: "Internal server error" });
    }
});

// **LOGIN Route**
router.post("/login", async (req, res) => {
    console.log("Login request received:", req.body);

    try {
        const { username, password } = req.body;
        let users = loadUsers();

        console.log("Loaded users:", users);

        const user = users.find(user => user.username === username);

        if (!user) {
            console.error("User not found:", username);
            return res.status(400).json({ message: "Invalid credentials" });
        }

        console.log("Found user:", user);

        const isMatch = await bcrypt.compare(password, user.password);
        console.log("Password match:", isMatch);

        if (!isMatch) {
            console.error("Password does not match for:", username);
            return res.status(400).json({ message: "Invalid credentials" });
        }

        const token = jwt.sign(
            { id: user.id, role: user.role },
            process.env.JWT_SECRET || "secret",
            { expiresIn: "1h" }
        );

        console.log("Token generated:", token);
        res.json({ token, userId: user.id, role: user.role });

    } catch (error) {
        console.error("Login error:", error);
        res.status(500).json({ message: "Internal server error" });
    }
});
module.exports = router;
