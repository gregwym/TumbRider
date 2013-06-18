var express = require('express');
var useLocalPassport = require('../passport/local');
var useTumblrPassport = require('../passport/tumblr');

module.exports = function() {
  this.use(express.errorHandler());
  // useLocalPassport();
  useTumblrPassport();
};
