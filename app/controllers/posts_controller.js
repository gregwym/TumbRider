var locomotive = require('locomotive'),
    Controller = locomotive.Controller,
    request = require('request'),
    credentials = require('../../config/credentials.js');

var TumblrController = new Controller();

TumblrController.blogposts = function() {
  var self = this;
  var api_key = credentials.tumblr_consumer_key;
  var url = 'http://api.tumblr.com/v2/blog/' + self.param('blog') + '/posts?api_key=' + api_key;

  var render_output = function(body) {
    self.body = body;
    self.respond({
      // 'html': true,
      'json': function() { self.res.json(body); }
    });
  };

  var render_error = function(error, response) {
    self.res.status(response.statusCode).send('Fail to fetch ' + url + ' from tumblr: ' + response.statusCode);
  };

  request.get({url: url, json: true}, function(error, response, body) {
    if (!error && response.statusCode == 200) {
      render_output(body);
    } else {
      render_error(error, response);
    }
  });
};

module.exports = TumblrController;
