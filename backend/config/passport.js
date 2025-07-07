// config/passport.js
const passport = require("passport");
const GoogleStrategy = require("passport-google-oauth20").Strategy;
const User = require("../models/user_model");

passport.use(
  new GoogleStrategy(
    {
      clientID:     process.env.GOOGLE_CLIENT_ID,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET,
      callbackURL:  "/auth/google/callback",   // <-- keep this path
    },
    async (_, __, profile, done) => {
      try {
        let user = await User.findOne({ googleId: profile.id });
        if (!user) {
          user = await User.create({
            fullname: profile.displayName,
            email:    profile.emails?.[0]?.value,
            googleId: profile.id,
            avatar:   profile.photos?.[0]?.value,
          });
        }
        return done(null, user);
      } catch (e) {
        return done(e, null);
      }
    }
  )
);
