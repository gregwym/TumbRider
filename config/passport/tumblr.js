var passport = require('passport'),
    TumblrStrategy = require('passport-tumblr').Strategy,
    models = require('../../app/models'),
    config = require('../config');

module.exports = function init () {
  passport.use(new TumblrStrategy({
      consumerKey: config.tumblr_consumer_key,
      consumerSecret: config.tumblr_consumer_secret,
      callbackURL: 'http://' + config.base_domain + '/auth/tumblr/callback'
    },
    function(token, tokenSecret, profile, done) {
      // asynchronous verification, for effect...
      process.nextTick(function () {
        models.users.findOne({ 'tumblr.name': profile.username }, function(err, user) {
          if(err) {
            return done(err, null);
          }

          // Determin whether is an existing user, then update or create it.
          if (user) {
            user.tumblr.token = token;
            user.tumblr.tokenSecret = tokenSecret;
          } else {
            user = new models.users({
              'tumblr.name': profile.username,
              'tumblr.token': token,
              'tumblr.tokenSecret': tokenSecret
            });
          }

          // Save the user
          user.save(function(err, user) {
              if (err) { return done(err, null); }
              return done(null, user);
            });
        });
      });
    }
  ));

  console.log("Passport initialized with Tumblr Strategy.");
};
