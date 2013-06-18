var passport = require('passport'),
    TumblrStrategy = require('passport-tumblr').Strategy,
    credentials = require('../credentials');

module.exports = function init () {
  // Passport session setup.
  //   To support persistent login sessions, Passport needs to be able to
  //   serialize users into and deserialize users out of the session.  Typically,
  //   this will be as simple as storing the user ID when serializing, and finding
  //   the user by ID when deserializing.
  passport.serializeUser(function(user, done) {
    done(null, user);
  });

  passport.deserializeUser(function(obj, done) {
    done(null, obj);
  });

  passport.use(new TumblrStrategy({
      consumerKey: credentials.tumblr_consumer_key,
      consumerSecret: credentials.tumblr_consumer_secret,
      callbackURL: 'http://localhost:3000/auth/tumblr/callback'
    },
    function(token, tokenSecret, profile, done) {
      // asynchronous verification, for effect...
      process.nextTick(function () {
        // To keep the example simple, the user's Tumblr profile is returned to
        // represent the logged-in user.  In a typical application, you would want
        // to associate the Tumblr account with a user record in your database,
        // and return that user instead.
        return done(null, profile);
      });
    }
  ));

  console.log("Passport initialized with Tumblr Strategy.");
};
