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
  this.post('login', function(req, res, next){
    passport.authenticate('local', function(err, user, info){
      // This is the default destination upon successful login.
      var redirectUrl = '/';

      if (err) { return next(err); }
      if (!user) { return res.redirect('/login'); }

      // If we have previously stored a redirectUrl, use that,
      // otherwise, use the default.
      if (req.session.redirectUrl) {
        redirectUrl = req.session.redirectUrl;
        req.session.redirectUrl = null;
      }
      req.login(user, function(err){
        if (err) { return next(err); }
      });
      res.redirect(redirectUrl);
    })(req, res, next);
  });
  this.get('logout', 'pages#logout', { as: 'logout'});

  this.resources('tumblr', function() {
    this.resources('posts');
  });
};
