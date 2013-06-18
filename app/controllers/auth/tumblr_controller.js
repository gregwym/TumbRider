var locomotive = require('locomotive'),
    Controller = require('../../common/base_controller');

var AuthController = new Controller();

AuthController.status = function() {
  this.res.json({ user: this.req.user, account: this.req.account});
};

AuthController.before('*', function(next) {
  this.init();
  return next();
});

module.exports = AuthController;
