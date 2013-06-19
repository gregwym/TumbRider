var Controller = require('../common/base_controller');

var PagesController = new Controller();

PagesController.main = function() {
  var userAgent = this.req.headers['user-agent'];
  if (userAgent.match(/(iOS|iPad|iPhone|Android|Touch|BlackBerry|RIM|IEMobile)/ig) !== null) {
    this.redirect(this.cardsPath());
  } else {
    this.res.send('User-agent: ' + this.req.headers['user-agent']);
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
