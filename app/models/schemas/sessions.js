var mongoose = require('mongoose');

exports = mongoose.Schema({
  _id: String,
  session: String,
  expires: Date
});
