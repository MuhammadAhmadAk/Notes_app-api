import express from 'express';
import { getDatabase } from '../config/mongodb_client';
import { User } from '../models/user_model';
import bcrypt from 'bcrypt';
import { ObjectId } from 'mongodb';
export class UserController {

    static async register(req: express.Request, res: express.Response) {
        let db = getDatabase();
        let userCollection = db.collection("users");
        const user: User = req.body;

        const checkUserInDb = {
            email: user.email,
        }

        const data = await userCollection.find(checkUserInDb).toArray();

        if (data.length != 0) {
            res.status(403).send({
                "success": false,
                "messege": "Register Failed",
                "response": "Email already exist"
            });

        } else {
            const salt = await bcrypt.genSalt(10);
            user.password = await bcrypt.hash(user.password, salt);
            
            const responseData = await userCollection.insertOne(user);

            const objectId = responseData.insertedId;
            const userInfo = await userCollection.find({ _id: new ObjectId(objectId) }).toArray();

            const userResponseData = userInfo[0];
            userResponseData.password = "";

            res.status(200).send({
                "success": true,
                "messege": "Register Successfull",
                "response": userResponseData
            })
        }

    }

    static async login(req: express.Request, res: express.Response) {
        let db = getDatabase();
        let userCollection = db.collection("users");
        const user: User = req.body;

        const checkUserInDb = {
            email: user.email,
        }
        const data = await userCollection.find(checkUserInDb).toArray();


        if (data.length) {
            let userInfo = data[0];
            const pass = await bcrypt.compare(user.password, userInfo.password);


            if ((user.email == userInfo.email) && pass) {


                res.status(200).json({
                    "success": true,
                    "messege": "Login Successfully",
                    "response": userInfo
                })

            }
            else {
                res.status(403).json({
                    "success": false,
                    "messege": "Login Failed",
                    "response": "Invaild email and password please check"
                });
            }
        } else {
            res.status(403).json({
                "messege": "user is not exist"
            });
        }

    }
}