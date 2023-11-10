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


        // Create an object with the fields you want to update
        const updateNoteObj = {
            title: note.title,
            description: note.description,
            creatorId: note.creatorId, // Corrected the property name
            createdAt: note.createAt // Corrected the property name
        };

        // Use updateOne with the correct parameter for filtering
        const noteData = await notesCollection.updateOne(
            { _id: new ObjectId(note.noteId) },
            { $set: updateNoteObj }
        );

        // Check if the update was successful
        res.status(200).json(
            {
                "status": "success",
                "response": noteData
            }

        )

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