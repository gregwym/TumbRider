var qs = require('querystring'),
    request = require('request'),
    config = global.app.config;

// Tumblr URLs
var BLOG_POSTS_URL = 'http://api.tumblr.com/v2/blog/{baseHostname}/posts/photo?';

function TumblrApi (user) {
  this.consumerKey = config.tumblr_consumer_key;
  this.consumerSecret = config.tumblr_consumer_secret;
  if (user) {
    this.token = user.token;
    this.tokenSecret = user.tokenSecret;
  }
}

TumblrApi.prototype.blogPosts = function(baseHostname, done, params) {
  var url = BLOG_POSTS_URL.replace('{baseHostname}', baseHostname);
  params.api_key = this.consumerKey;
  url += qs.stringify(params);

  request.get({url: url, json: true}, done);
};

module.exports = TumblrApi;
