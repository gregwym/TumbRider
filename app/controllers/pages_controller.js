var locomotive = require('locomotive'),
Controller = locomotive.Controller;

var PagesController = new Controller();

PagesController.main = function() {
  this.res.send('Welcome ' + this.req.user.username);
};

PagesController.login = function() {
  this.title = 'TumbRider';
  this.user = this.req.user;
  this.render();
};

module.exports = PagesController;
