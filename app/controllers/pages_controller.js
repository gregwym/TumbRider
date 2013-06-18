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
    return this.redirect(this.req.session.redirectUrl || '/');
  }
  this.render();
};

PagesController.logout = function() {
  this.req.logout();
  this.redirect(this.req.session.redirectUrl || '/');
};

PagesController.before('*', function(next) {
  this.init();
  return next();
});

module.exports = PagesController;
