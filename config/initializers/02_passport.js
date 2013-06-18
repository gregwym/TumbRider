var passport = require('passport');
var useLocalStrategy = require('../passport/local');
var useTumblrStrategy = require('../passport/tumblr');

module.exports = function() {
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

  useLocalStrategy();
  useTumblrStrategy();

  console.log("Passport initialized.");
};
