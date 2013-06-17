var locomotive = require('locomotive'),
Controller = locomotive.Controller;

var PagesController = new Controller();

PagesController.main = function() {
  this.title = 'TumbRider';
  if (this.req.isAuthenticated()) {
    this.res.send("Logged in");
  } else {
    this.render();
  }
};

module.exports = PagesController;
