const GoogleStrategy = require("passport-google-oauth20").Strategy;
const passport = require("passport");
const User = require("./models/User");

passport.use(
	new GoogleStrategy(
		{
			clientID: process.env.CLIENT_ID,
			clientSecret: process.env.CLIENT_SECRET,
			callbackURL: "/auth/google/callback",
			scope: ["profile", "email"],
		},
        async function (accessToken, refreshToken, profile, done) {
            try {
                // Check if the user already exists in the database
                let existingUser = await User.findOne({ googleId: profile.id });

                if (existingUser) {
                    // If user exists, proceed with that user
                    return done(null, existingUser);
                }

                // If user does not exist, create a new user in the database
                const newUser = new User({
                    googleId: profile.id,
                    name: profile.displayName,
                    email: profile.emails[0].value,
                });

                // Save the new user to the database
                const savedUser = await newUser.save();
                return done(null, savedUser);
            } catch (error) {
                return done(error, false);
            }
        }
    )
);

// Serialize user into session
passport.serializeUser((user, done) => {
    done(null, user.id);  // Store the user id in the session
});

// Deserialize user from session
passport.deserializeUser(async (id, done) => {
    try {
        // Find the user by id in the database
        const user = await User.findById(id);
        done(null, user);
    } catch (error) {
        done(error, false);
    }
});