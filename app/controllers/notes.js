var mongoose = require('mongoose');
var Note = mongoose.model('Note');

//GET - Return all Notes in the DB
exports.findAllNotes = function(req, res) {
	Note.find(function(err, notes) {
    if(err) res.send(500, err.message);
    console.log('GET /notes');
		res.status(200).jsonp(notes);
	});
};

//GET - Return a Note with specified ID
exports.findById = function(req, res) {
	Note.findById(req.params.id, function(err, note) {
    if(err) return res.send(500, err.message);
    console.log('GET /notes/' + req.params.id);
		res.status(200).jsonp(note);
	});
};

//POST - Insert a new Alojado in the DB
exports.addNote = function(req, res) {
	var note = new Note({
    title: req.body.title,
    content: req.body.content,
    author: req.body.author
//    created: req.body.date,
//    lastUpdated: new Date()
  });

	note.save(function(err, note) {
		if(err) return res.send(500, err.message);
    res.status(200).jsonp(note);
		console.log('POST /notes/' + req.params.id);
	});
};

//PUT - Update a note that already exists
exports.updateNote =  function(req, res) {

		return Note.findById(req.params.id, asyncfunction(err, note) {

			var updatedNote = new Note({
				...note,
		    title : req.body.title,
		    content : req.body.content,
		    author : req.body.author
//		    created : req.body.created,
//		    lastUpdated : req.body.lastUpdated
			});

			try {
			  await updatedNote.save();
				res.status(200).jsonp(updatedNote);
				console.log('PUT /notes/' + req.params.id);
			} catch (err) {
				res.send(500, err.message);
			}
	});
};

//DELETE - Delete a Alojado with specified ID
exports.deleteNote = function(req, res) {
	return Note.findById(req.params.id, async function(err, note) {
		try	{
			await note.remove();
			res.status(200).jsonp(note);
			console.log('DELETE /notes/' + req.params.id);
		} catch (err) {
			res.send(500, err.message);
		}
	});
};
