const router = require("express").Router();
const passport = require("passport");
const jwt = require('jsonwebtoken');


router.get("/login/success", (req, res) => {
   
	console.log(process.env.JWT_SECRET);// This should log the user object if authenticated
    if (req.user) {
		const token = jwt.sign(
            { id: req.user._id },
            process.env.JWT_SECRET, // Your JWT secret key
            { expiresIn: '24h' } // Token expiration time
        );
		console.log(token);
        res.status(200).json({
            error: false,
            message: "Successfully Logged In",
            // user: req.user,
			user: {
                _id: req.user._id,
                name: req.user.name,
                email: req.user.email,
                leetQuestions: req.user.leetQuestions,
                token: token // Include the token in the response
            },
        });
		// console.log(user);
    } else {
        res.status(403).json({ error: true, message: "Not Authorized" });
    }
});


router.get("/login/failed", (req, res) => {
	res.status(401).json({
		error: true,
		message: "Log in failure",
	});
});

router.get("/google", passport.authenticate("google", ["profile", "email"]));

router.get(
	"/google/callback",
	passport.authenticate("google", {
		successRedirect: process.env.CLIENT_URL,
		failureRedirect: "/login/failed",
	})
);

router.get("/logout", (req, res) => {
	req.logout();
	res.redirect(process.env.CLIENT_URL);
});

module.exports = router;