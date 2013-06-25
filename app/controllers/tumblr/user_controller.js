var Controller = require('../../common/base_controller');
    User = require('tumblr').User;

var PagesController = new Controller();

PagesController.info = function() {
  var self = this;
  var config = global.app.config;
  var user = new User(config.tumblr_consumer_key,
                      config.tumblr_consumer_secret,
                      self.user.tumblr.token,
                      self.user.tumblr.tokenSecret);

  user.info(function(err, response) {
    if (err) {
      return self.res.status(500).send(err);
    }
    self.res.json(response);
  });
};

PagesController.dashboard = function() {
  var self = this;
  var config = global.app.config;
  var user = new User(config.tumblr_consumer_key,
                      config.tumblr_consumer_secret,
                      self.user.tumblr.token,
                      self.user.tumblr.tokenSecret);

  user.dashboard(this.req.query, function(err, response) {
    if (err) {
      return self.res.status(500).send(err);
    }
    self.res.json(response);
  });
};

PagesController.before('*', function(next) {
  this.init();
  this.setRedirectUrl();
  return next();
});

module.exports = PagesController;
