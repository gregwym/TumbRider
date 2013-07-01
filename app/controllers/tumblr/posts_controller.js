var locomotive = require('locomotive'),
    Controller = require('../../common/base_controller'),
    Blog = require('tumblr').Blog;

var PostsController = new Controller();

PostsController.display = function(blogHostname, offset) {
  var self = this;
  self.title = '"' + blogHostname + '" Posts';

  var config = global.app.config;
  var blog = new Blog(blogHostname, { consumer_key: config.tumblr_consumer_key });
  var params = self.req.query;
  if (offset) {
    params.offset = offset;
  }

  blog.photo( params, function(err, response) {
    if(err) {
      return renderError(err);
    }
    posts = response.posts;
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
    self.res.status(500)
        .send('Fail to fetch ' + blogHostname + ' from tumblr: ' + err);
  };
};

PostsController.index = function() {
  var blog = this.param('blog_id');
  this.display(blog);
};

PostsController.show = function() {
  var blog = this.param('blog_id');
  var offset = this.param('id');
  this.display(blog, offset);
};

PostsController.before('*', function(next) {
  this.init();
  this.setRedirectUrl();
  return next();
});

module.exports = PostsController;
