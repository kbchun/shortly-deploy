// Connection URL
var mongoose = require('mongoose');
mongoose.connect('mongodb://localhost:27017/');

// Use connect method to connect to the server
var db = mongoose.connection;
db.on('error', console.error.bind(console, 'connection error:'));
db.once('open', console.log.bind(console, 'connected!')); 

var userSchema = mongoose.Schema({
  id: { type: mongoose.Schema.Types.ObjectId, unique: true }, // might not work
  username: { type: String, unique: true }, 
  password: String, 
});

var linkSchema = mongoose.Schema({
  id: { type: mongoose.Schema.Types.ObjectId, unique: true }, // TODO do we have to add tables to MongoDB?
  url: String,
  baseUrl: String, 
  code: String,
  title: String,
  visits: Number
  // Leaving out timestamps because our app does not use it
});

module.exports.db = db;
module.exports.userSchema = userSchema;
module.exports.linkSchema = linkSchema;
