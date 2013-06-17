var locomotive = require('locomotive'),
    util = require('util'),
    credentials = require('../../config/credentials.js');

function Controller () {
  locomotive.Controller.call(this);
}

util.inherits(Controller, locomotive.Controller);

Controller.prototype.loadCredentials = function() {
    this.credentials = credentials;
};

Controller.prototype.checkLogin = function() {
  this.req.session.redirectUrl = this.req.url;
  this.user = this.req.user;
  return this.req.isAuthenticated();
};

Controller.prototype.requireLogin = function() {
  var result = this.checkLogin();
  if (!result) {
    this.redirect(this.loginPath());
  }
  return result;
};

module.exports = Controller;
