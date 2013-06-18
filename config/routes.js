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

  this.resources('tumblr', function() {
    this.resources('posts');
  });
};
