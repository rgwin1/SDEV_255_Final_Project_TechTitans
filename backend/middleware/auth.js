const jwt = require("jsonwebtoken");
const fs = require("fs");
const path = require("path");

const secretKey = process.env.JWT_SECRET || "your_secret_key"; // Fallback key
const USERS_FILE = path.join(__dirname, "../data/users.json");

// Load users from JSON file
const loadUsers = () => {
    try {
        const data = fs.readFileSync(USERS_FILE);
        return JSON.parse(data);
    } catch (error) {
        return []; // Return empty array if file is missing
    }
};

const authMiddleware = (req, res, next) => {
    const token = req.header("Authorization");

    if (!token) {
        return res.status(401).json({ error: "You must be logged in" });
    }

    try {
        // Remove "Bearer " prefix if present
        const cleanToken = token.startsWith("Bearer ") ? token.slice(7) : token;
        const decoded = jwt.verify(cleanToken, secretKey);

        // Load users and verify user exists
        const users = loadUsers();
        const user = users.find((u) => u.id === decoded.id);

        if (!user) {
            return res.status(401).json({ error: "Invalid token: User not found" });
        }

        req.user = { id: user.id, role: user.role };
        next();
    } catch (error) {
        return res.status(401).json({ error: "Invalid token" });
    }
};

module.exports = authMiddleware;
