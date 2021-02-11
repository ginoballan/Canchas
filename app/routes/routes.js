const express = require ('express');
const router = express.Router();

const NotesCtrl = require('../controllers/notes.js');

router.route('/notes')
  .get(NotesCtrl.findAllNotes)
  .post(NotesCtrl.addNote);

router.route('/notes/:id')
  .get(NotesCtrl.findById)
  .put(NotesCtrl.updateNote)
  .delete(NotesCtrl.deleteNote);

module.exports = router;
