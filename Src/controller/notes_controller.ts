import express from 'express';
import { getDatabase } from '../config/mongodb_client';
import { Notes } from '../models/notes_model';
import { ObjectId } from 'mongodb';
export class NotesController {
    static async addNotes(req: express.Request, res: express.Response) {
        let db = getDatabase();
        let notesCollection = db.collection("notes");

        const note: Notes = req.body;

        note.createAt = Date.now();

        const data = await notesCollection.insertOne(note);

        res.status(200).json({
            "status": "success",
            "data": data
        })
    }

    static async getAllNote(req: express.Request, res: express.Response) {
        let db = getDatabase();
        let notesCollection = db.collection("notes");

        const uid = req.query.uid;

        const data = await notesCollection.find({ creatorId: uid }).toArray();

        res.status(200).json({
            "status": "success",
            "data": data
        });

    }

    static async updateNote(req: express.Request, res: express.Response) {
        let db = getDatabase();
        let notesCollection = db.collection("notes");

        const note: Notes = req.body;

        const updateNoteObj = {
            title: note.title,
            description: note.description,
            createAt: note.createAt
        }
        const noteData = await notesCollection.updateOne({ _id: new ObjectId(note.noteId) }, { $set: updateNoteObj });

        res.status(200).json({
            "status": "Success",
            "response": noteData
        })
    }
    static async deleteNote(req: express.Request, res: express.Response) {
        let db = getDatabase();
        let notesCollection = db.collection("notes");

        const note: Notes = req.body;


        const noteData = await notesCollection.deleteOne({ _id: new ObjectId(note.noteId) });

        res.status(200).json({
            "status": "Success",
            "response": noteData
        })
    }
}