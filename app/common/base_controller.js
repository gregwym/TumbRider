var locomotive = require('locomotive'),
    util = require('util'),
    credentials = require('../../config/credentials.js');

function Controller () {
  locomotive.Controller.call(this);
}

util.inherits(Controller, locomotive.Controller);

Controller.prototype.init = function() {
  this.LOGIN_PATH = this.loginPath();
  this.LOGOUT_PATH = this.logoutPath();
  this.REDIRECT_PATH = this.redirectPath();

  this.user = this.req.user;
};

Controller.prototype.isLogin = function() {
  return this.req.isAuthenticated();
};

Controller.prototype.requireLogin = function() {
  var result = this.isLogin();
  if (!result) {
    this.redirect(this.loginPath());
  }
  return result;
};

Controller.prototype.loadCredentials = function() {
    this.credentials = credentials;
};

Controller.prototype.setRedirectUrl = function(url) {
  this.req.session.redirectUrl = url || this.req.url;
};


module.exports = Controller;
