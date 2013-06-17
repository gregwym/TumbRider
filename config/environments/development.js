var express = require('express');
var useLocalPassport = require('../passport/local');

module.exports = function() {
  this.use(express.errorHandler());
  useLocalPassport();
};
