require("dotenv").config();
const express = require("express");
const cors = require("cors");
const passport = require("passport");
const authRoute = require("./routes/auth.js");
const userRoute = require("./routes/user.js");  // Import user route
const cookieSession = require("cookie-session");
const mongoose = require("mongoose");
const passportStrategy = require("./passport.js"); // Adjusted path for passport config
const app = express();

// MongoDB Connection (Localhost)
mongoose.connect(process.env.MONGO_URI || 'mongodb://localhost:27017/leettrack', {
    useNewUrlParser: true,
    useUnifiedTopology: true,
})
.then(() => console.log('MongoDB connected locally'))
.catch((err) => console.error('MongoDB connection error:', err));

// Middleware for parsing JSON
app.use(express.json());

// Cookie session middleware
app.use(
    cookieSession({
        name: "session",
        keys: ["cyberwolve"], // Secure key, consider using .env variable for production
        maxAge: 24 * 60 * 60 * 1000, // 24 hours
    })
);
app.options('*', cors());
// Initialize Passport middleware
app.use(passport.initialize());
app.use(passport.session());

// CORS middleware

app.use(
    cors({
        origin: ["http://localhost:5173", "https://leetcode.com","chrome-extension://gpdbdbndmhmeoeglgfnmadelognahiaj"], // Frontend URL for local development
        methods: "GET,POST,PUT,DELETE",
        credentials: true,
    })
);

// Routes
app.use("/auth", authRoute); // Google OAuth routes
app.use("/user", userRoute); // Routes for user data (LeetCode questions)

// Start the server
const port = process.env.PORT || 8080;
app.listen(port, () => console.log(`Listening on port ${port}...`));
