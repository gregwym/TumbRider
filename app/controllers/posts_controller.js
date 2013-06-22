var locomotive = require('locomotive'),
    Controller = require('../common/base_controller'),
    Tumblr = require('tumblr').Tumblr;

var PostsController = new Controller();

PostsController.display = function(blogHostname, offset) {
  var self = this;
  self.title = '"' + blogHostname + '" Posts';

  var config = global.app.config;
  var blog = new Tumblr(blogHostname, config.tumblr_consumer_key);

  blog.photo( { offset: offset }, function(err, response) {
    if(err) {
      return renderError(err);
    }
    return renderOutput(response);
  });

  var renderOutput = function(response) {
    self.posts = response.posts;
    self.respond({
      'html': { template: 'grid' },
      'json': function() { self.res.json(response); }
    });
  };

  var renderError = function(err) {
    self.res.status(response.statusCode)
        .send('Fail to fetch ' + blogHostname + ' from tumblr: ' + err);
  };
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

PostsController.before('*', function(next) {
  this.init();
  this.setRedirectUrl();
  return next();
});

module.exports = PostsController;
