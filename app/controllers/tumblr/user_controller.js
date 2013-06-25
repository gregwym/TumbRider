var Controller = require('../../common/base_controller');
    User = require('tumblr').User;

var PagesController = new Controller();

PagesController.info = function() {
  var self = this;
  var config = global.app.config;
  var oauth = {
    consumer_key: config.tumblr_consumer_key,
    consumer_secret: config.tumblr_consumer_secret,
    token: self.user.tumblr.token,
    token_secret: self.user.tumblr.tokenSecret
  };
  var user = new User(oauth);

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
  var oauth = {
    consumer_key: config.tumblr_consumer_key,
    consumer_secret: config.tumblr_consumer_secret,
    token: self.user.tumblr.token,
    token_secret: self.user.tumblr.tokenSecret
  };
  var user = new User(oauth);

  user.dashboard(this.req.query, function(err, response) {
    if (err) {
      return self.res.status(500).send(err);
    }
    self.res.json(response);
  });
};

PagesController.before('*', function(next) {
  this.init();
  return next();
});

module.exports = PagesController;
