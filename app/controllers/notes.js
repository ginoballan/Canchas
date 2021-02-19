var mongoose = require('mongoose');
var Note = mongoose.model('Note');

// GET - Return all Notes in the DB
exports.findAllNotes = async function(req, res) {
	try {
		var notes = await Note.find();
		res.status(200).jsonp(notes);
		console.log('GET /notes');
	} catch (err) {
		res.send(500, err.message);
	}
};

// GET - Return a Note with specified ID
exports.findById = async function(req, res) {
	var note = await Note.findById(req.params.id);
	if(note == null) {
		res.status(404).jsonp('note ' + req.params.id +' not found');
	} else {
		try {
			res.status(200).jsonp(note);
			console.log('GET /notes/' + req.params.id);
		} catch (err) {
			res.send(500, err.message);
		}
	}
};

// POST - Insert a new Notes in the DB
exports.addNote = async function (req, res) {
	try {
		var newNote = new Note(req.body);
		var result = await newNote.save();
		res.status(200).jsonp(result);
		console.log('POST /notes/' + newNote.id);
	} catch (err) {
		res.send(500, err.message);
	}
};

// PUT - Update a note that already exists
exports.updateNote = async function (req, res) {
	var note = await Note.findById(req.params.id);
	if(note == null) {
		res.status(404).jsonp('note ' + req.params.id +' not found');
	} else {
		try {
			note.title = req.body.title;
			note.content = req.body.content;
			note.author = req.body.author;
			//  note.created = req.body.date;
			//  note.lastUpdated = new Date();
			await note.save();
			res.status(200).jsonp(note);
			console.log('PUT /notes/' + req.params.id);
		} catch (err) {
			res.send(500, err.message);
		}
	}
};

// DELETE - Delete a Note with specified ID
exports.deleteNote = function (req, res) {
	return Note.findById(req.params.id, async function (err, note) {
		if(note == null) {
			res.status(404).jsonp('note ' + req.params.id +' not found');
		} else {
			try {
				await note.remove();
				res.status(200).jsonp(note);
				console.log('DELETE /notes/' + req.params.id);
			} catch (err) {
				res.send(500, err.message);
			}
		}
	});
};
