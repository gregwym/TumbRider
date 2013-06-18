var locomotive = require('locomotive'),
    Controller = require('../common/base_controller');

var PagesController = new Controller();

PagesController.main = function() {
  if(this.requireLogin()) {
    this.res.send('Welcome ' + this.req.user.username);
  }
};

PagesController.login = function() {
  // If has login, redirect to last page.
  if (this.isLogin()) {
    return this.redirect(this.REDIRECT_PATH);
  }
  this.render();
};

PagesController.redirectTo = function() {
  this.redirect(this.req.session.redirectUrl || '/');
};

PagesController.logout = function() {
  this.req.logout();
  this.redirect(this.REDIRECT_PATH);
};

PagesController.before('*', function(next) {
  this.init();
  return next();
});

module.exports = PagesController;
