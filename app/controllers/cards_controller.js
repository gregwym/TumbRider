var Controller = require('../common/base_controller');
var CardsController = new Controller();

CardsController.index = function() {
  this.render();
};

CardsController.before('*', function(next) {
  this.init();
  this.setRedirectUrl();
  return next();
});

module.exports = CardsController;
