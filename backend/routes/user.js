// routes/user.js
const router = require('express').Router();
const User = require('../models/User');

const jwt = require('jsonwebtoken');
// const jwt = require('jsonwebtoken-simple');
// const User = require('./models/User'); // Adjust path according to your project structure

// Middleware to check if user is authenticated
const isAuthenticated = async (req, res, next) => {
    // Get token from Authorization header
    const authHeader = req.headers['authorization'];
    const token = authHeader && authHeader.split(' ')[1]; // Extract token from 'Bearer TOKEN' format
    console.log("1233"+token);
    if (!token) {
        return res.status(401).json({ message: 'No token provided' });
    }

    try {
        // Verify and decode the token
        console.log(process.env.JWT_SECRET);
        
        // const decoded = jwt.verify(token,process.env.JWT_SECRET); 
        const decoded = jwt.decode(token);  
        // const decoded = jwt.decode(token,process.env.JWT_SECRET);  
        console.log(process.env.JWT_SECRET);

        const user = await User.findById(decoded.id);
        
        if (!user) {
            return res.status(404).json({ message: 'User not found' });
        }

        req.user = user; // Attach user to request object
        next(); // Proceed to the next middleware or route handler
    } catch (err) {
        console.error('Token verification error:', err);
        res.status(403).json({ message: 'Invalid token' });
    }
};


// Add a LeetCode problem to the user's saved list
router.post('/add-question', isAuthenticated, async (req, res) => {
    const { title, url } = req.body;

    if (!title || !url) {
        return res.status(400).json({ message: 'Title and URL are required' });
    }

    try {
        // The user has already been attached to req by isAuthenticated middleware
        const user = req.user;

        // Create a new question object with title and URL
        const question = { title, url };
        user.leetQuestions.push(question); // Add the question to the user's list

        await user.save(); // Save the user with the new question
        res.status(200).json({ message: 'Question added successfully' });
    } catch (err) {
        console.error('Error adding question:', err); // Log the error for debugging
        res.status(500).json({ message: 'Unable to add question', error: err.message });
    }
});

router.get('/questions', async (req, res) => {
    if (!req.user) {
        return res.status(403).json({ error: true, message: "Not authorized" });
    }

    try {
        const user = await User.findById(req.user.id);  // Find user by ID
        if (!user) {
            return res.status(404).json({ error: true, message: "User not found" });
        }

        res.status(200).json({
            error: false,
            questions: user.leetQuestions,
        });
    } catch (error) {
        res.status(500).json({ error: true, message: "Server error" });
    }
});

module.exports = router;
