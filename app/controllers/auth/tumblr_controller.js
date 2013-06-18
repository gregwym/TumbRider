var locomotive = require('locomotive'),
    Controller = require('../../common/base_controller');

var AuthController = new Controller();

AuthController.status = function() {
  this.res.json(this.req.user);
};

AuthController.before('*', function(next) {
  this.init();
  return next();
});

module.exports = AuthController;
