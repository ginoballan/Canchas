const mongoose = require('mongoose');
const Schema = mongoose.Schema;

//const UserSchema = require('./user.js');

const noteSchema = new Schema({
  title: { type: String },
  content: { type: String },
  author: { type: String },
//  created: { type: Date },
//  lastUpdated: { type : Date, default: new Date() },
});

const Note = mongoose.model('Note', noteSchema);

module.exports = Note;
