var mongoose = require('mongoose');

var users = mongoose.Schema({
  tumblr: {
    name: String,
    token: String,
    tokenSecret: String
  }
});

users.virtual('displayName').get(function() {
  return this.tumblr.name;
});

module.exports = users;
