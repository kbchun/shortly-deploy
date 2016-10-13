var db = require('../config');
var mongoose = require('mongoose');
var crypto = require('crypto');

db.linkSchema.pre('save', function(next) { // TODO test this
  var shasum = crypto.createHash('sha1');
  shasum.update(this.url);
  this.code = shasum.digest('hex').slice(0, 5);
  next();
});

var Link = mongoose.model('Link', db.linkSchema);

module.exports = Link;
