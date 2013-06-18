var passport = require('passport'),
    TumblrStrategy = require('passport-tumblr').Strategy,
    credentials = require('../credentials');

module.exports = function init () {
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
