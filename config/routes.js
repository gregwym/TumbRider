// Draw routes.  Locomotive's router provides expressive syntax for drawing
// routes, including support for resourceful routes, namespaces, and nesting.
// MVC routes can be mapped mapped to controllers using convenient
// `controller#action` shorthand.  Standard middleware in the form of
// `function(req, res, next)` is also fully supported.  Consult the Locomotive
// Guide on [routing](http://locomotivejs.org/guide/routing.html) for additional
// information.
var passport = require('passport');

module.exports = function routes() {
  this.root('cards#index');

  // General
  this.get('logout', 'pages#logout', { as: 'logout'});
  this.get('redirect', 'pages#redirectTo', { as: 'redirect'});

  // Local Authentication
  this.get('login', 'pages#login', { as: 'login'});
  this.post('login', passport.authenticate('local', { successRedirect: '/redirect',
                                                      failureRedirect: '/login' }));

  // Third-party Authentication
  this.namespace('auth', function() {
    this.get('tumblr', passport.authenticate('tumblr'));
    this.get('tumblr/callback', passport.authenticate('tumblr', { successRedirect: '/redirect',
                                                                  failureRedirect: '/login' }));
    this.get('tumblr/status', 'tumblr#status');
  });

  // DB Inspection
  this.get('sessions', 'pages#sessions');
  this.get('users', 'pages#users');

  // Tumblr API
  this.namespace('tumblr', function() {
    this.resources('blogs', function() {
      this.resources('posts');
    });
    this.get('user/info', 'user#info');
    this.get('user/dashboard', 'user#dashboard');
  });

  // Kik Cards
  this.match('cards', 'cards#index', { as: 'cards'});
};
