import express from 'express';
import { NotesController } from '../controller/notes_controller';


const notesRouter: express.Router = express.Router();

notesRouter.get('/getAllNote', NotesController.getAllNote);
notesRouter.post('/addNotes', NotesController.addNotes);
notesRouter.put('/updateNote', NotesController.updateNote);
notesRouter.delete("/deleteNote", NotesController.deleteNote)

export default notesRouter; 