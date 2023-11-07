import { MongoClient, Db } from 'mongodb';

let mongodb: Db;

export async function connectDatabase() {
    const url = 'mongodb://127.0.0.1:27017';
    const client = new MongoClient(url);
    mongodb = client.db('NotesApp');
    console.log("Db Connect successfully");
}

export function getDatabase(): Db {
    return mongodb;
}