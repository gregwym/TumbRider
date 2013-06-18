// Draw routes.  Locomotive's router provides expressive syntax for drawing
// routes, including support for resourceful routes, namespaces, and nesting.
// MVC routes can be mapped mapped to controllers using convenient
// `controller#action` shorthand.  Standard middleware in the form of
// `function(req, res, next)` is also fully supported.  Consult the Locomotive
// Guide on [routing](http://locomotivejs.org/guide/routing.html) for additional
// information.
var passport = require('passport');

module.exports = function routes() {
  this.root('pages#main');

  // Authentication
  this.get('login', 'pages#login', { as: 'login'});
  this.post('login', passport.authenticate('local', { successRedirect: '/redirect',
                                                      failureRedirect: '/login' }));
  this.get('logout', 'pages#logout', { as: 'logout'});
  this.get('redirect', 'pages#redirectTo', { as: 'redirect'});

  this.namespace('auth', function() {
    this.get('tumblr', passport.authenticate('tumblr'));
    this.get('tumblr/callback', passport.authenticate('tumblr', { successRedirect: '/auth/tumblr/status',
                                                                  failureRedirect: '/login' }));
    this.get('tumblr/status', 'tumblr#status');
  });

  this.resources('tumblr', function() {
    this.resources('posts');
  });
};
