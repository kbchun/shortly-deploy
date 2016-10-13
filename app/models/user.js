var db = require('../config');
var bcrypt = require('bcrypt-nodejs');
var Promise = require('bluebird');
var mongoose = require('mongoose');

db.userSchema.methods.comparePassword = function(attemptedPassword, actualPassword, callback) {
  bcrypt.compare(attemptedPassword, actualPassword, function(err, isMatch) {
    callback(isMatch);
  });
};

// Do not need initialize method
db.userSchema.pre('save', function(next) { // TODO test this
  var cipher = Promise.promisify(bcrypt.hash);
  return cipher(this.password, null, null).bind(this)
    .then(function(hash) {
      this.password = hash;
      next();
    });
});

var User = mongoose.model('User', db.userSchema);

module.exports = User;
