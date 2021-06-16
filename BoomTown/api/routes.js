const express = require('express');
const notesRoutes = express.Router();

const controller = require('../services/controller');

//Routes for redirecting specific actions

notesRoutes.post('/', controller.createNewNote);
notesRoutes.get('/:id', controller.getOneNoteData);
notesRoutes.get('/', controller.getAllNotesData);
notesRoutes.put('/:id', controller.updateNote);
notesRoutes.delete('/:id', controller.deleteNote);

module.exports = notesRoutes;