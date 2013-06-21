var passport = require('passport');
var models = require('../../app/models');
var useLocalStrategy = require('../passport/local');
var useTumblrStrategy = require('../passport/tumblr');

module.exports = function() {
  // Passport session setup.
  //   To support persistent login sessions, Passport needs to be able to
  //   serialize users into and deserialize users out of the session.  Typically,
  //   this will be as simple as storing the user ID when serializing, and finding
  //   the user by ID when deserializing.
  passport.serializeUser(function(user, done) {
    return done(null, user._id);
  });

  passport.deserializeUser(function(id, done) {
    // Find the user in db
    models.users.findOne({ '_id': id }, function(err, user) {
      if(err) {
        return done(err);
      }

      if (user) {
        return done(null, user);
      } else {
        return done(new Error('Invalid user id'));
      }
    });
  });

  useLocalStrategy();
  useTumblrStrategy();

  console.log("Passport initialized.");
};
