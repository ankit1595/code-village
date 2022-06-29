const passport = require("passport");
const googleStrategy = require("passport-google-oauth").OAuth2Strategy;
const crypto = require("crypto");
const User = require("../models/user");

// tell passport to use new strategy for google login
passport.use(
  new googleStrategy(
    {
      clientID:
        "748325177904-hb191trfe1dnbldb7l998uqg7i2fd7r6.apps.googleusercontent.com",
      clientSecret: "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",
      callbackURL: "http://localhost:8000/users/auth/google/callback",
    },
    function (accessToken, refereshToken, profile, done) {
      // find the user
      User.findOne({ email: profile.emails[0].value }).exec(function (
        err,
        user
      ) {
        if (err) {
          console.log("Error in google-passport strategy ", err);
          return;
        }
        console.log(profile);

        if (user) {
          //if user found, set this user as req.user
          return done(null, user);
        } else {
          // if user not found, create the user and set it as req.user
          User.create(
            {
              name: profile.displayName,
              email: profile.emails[0].value,
              password: crypto.randomBytes(20).toString("hex"),
            },
            function (err, user) {
              if (err) {
                console.log(
                  "Error in creating user/google-passport strategy ",
                  err
                );
                return;
              }
              return done(null, user);
            }
          );
        }
      });
    }
  )
);

module.exports = passport;
