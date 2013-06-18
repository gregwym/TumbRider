var locomotive = require('locomotive'),
    Controller = require('../common/base_controller');

var PagesController = new Controller();

PagesController.main = function() {
  if(this.requireLogin()) {
    this.res.send('Welcome ' + this.req.user.username);
  }
};

PagesController.login = function() {
  // Record redirect url first
  var redirectUrl = this.req.session.redirectUrl;
  if (!redirectUrl) {
    redirectUrl = '/';
  }
  // If has login, redirect to last page.
  if (this.checkLogin()) {
    return this.redirect(redirectUrl);
  }
  this.render();
};

PagesController.logout = function() {
  var redirectUrl = this.req.session.redirectUrl;
  if (!redirectUrl) {
    redirectUrl = '/';
  }
  this.req.logout();
  this.redirect(redirectUrl);
};

PagesController.before('main', function(next) {
  this.checkLogin();
  return next();
});

module.exports = PagesController;
