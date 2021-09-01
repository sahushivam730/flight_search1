const passport = require('passport');

// Google strategy //

const GoogleStrategy = require('passport-google-oauth').OAuth2Strategy;
const fs = require("fs");
passport.serializeUser(function(user, done) {
  /*
  From the user take just the id (to minimize the cookie size) and just pass the id of the user
  to the done callback
  PS: You dont have to do it like this its just usually done like this
  */
  done(null, user);
});

passport.deserializeUser(function(user, done) {
  /*
  Instead of user this function usually recives the id 
  then you use the id to select the user from the db and pass the user obj to the done callback
  PS: You can later access this data in any routes in: req.user
  */
  done(null, user);
});

passport.use(new GoogleStrategy({
    clientID: 'xxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxx',
    clientSecret: 'xxxxxxxxxxxxxxxxxxxxxxxxxxx',
    callbackURL: "https://localhost:8082/google/callback"
  },
  function(accessToken, refreshToken, profile, done) {
     return done(null, profile);       
  }
));