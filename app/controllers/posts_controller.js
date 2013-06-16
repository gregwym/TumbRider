var locomotive = require('locomotive'),
    Controller = locomotive.Controller,
    request = require('request'),
    credentials = require('../../config/credentials.js');

var PostsController = new Controller();

PostsController.display = function(blog, offset) {
  var self = this;
  var api_key = credentials.tumblr_consumer_key;
  var url = 'http://api.tumblr.com/v2/blog/' + blog + '/posts?api_key=' + api_key;
  if (typeof offset !== 'undefined') {
    url += '&offset=' + offset;
  }

  self.title = '"' + blog + '" Posts';

  var render_output = function(body) {
    self.posts = body.response.posts;
    self.respond({
      'html': { template: 'grid' },
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

PostsController.index = function() {
  var blog = this.param('tumblr_id');
  this.display(blog);
};

PostsController.show = function() {
  var blog = this.param('tumblr_id');
  var offset = this.param('id');
  this.display(blog, offset);
};

module.exports = PostsController;
