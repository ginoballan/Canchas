const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const app = express();

//db
mongoose.connect('mongodb://localhost/note', {useNewUrlParser: true }, function(err, res) {
  if(err) throw err;
  console.log('Connected to NoteApp Database');
  //mongoose.connection.db.dropDatabase();
});

// Middlewares
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());
app.set('json spaces', 2);

// importing models
require('./app/models/note.js');

// importing routes
const router = require("./app/routes/routes.js");
app.use('/', router);

// Starting server
app.listen(3000, function() {
  console.log('');
  console.log("Node server running on http://localhost:3000");
});




//process.traceDeprecation = true;
//  warning: "Mongoose 5.7.1 was release and seems to fix the issue, so setting up the useUnifiedTopology option work as expected.
//  mongoose.connect(mongoConnectionString, {useNewUrlParser: true, useUnifiedTopology: true});"
