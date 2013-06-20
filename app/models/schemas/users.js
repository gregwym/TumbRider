var mongoose = require('mongoose');

var users = mongoose.Schema({
  tumblr: {
    username: String,
    token: String,
    tokenSecret: String
  }
});

users.virtual('displayName').get(function() {
  return this.tumblr.username;
});

module.exports = users;
