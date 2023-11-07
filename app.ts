import express from "express";
import cors from "cors";
import { connectDatabase } from './Src/config/mongodb_client';
import appLogger from "./Src/middleware/app_logger";
import userRouter from "./Src/routers/user_router";

const app: express.Application = express();

app.use(cors());
app.use(express.json());
app.use(appLogger);
app.use(express.urlencoded({ extended: false }));
app.use('/v1/user', userRouter);

const hostName = "192.168.1.14";
const port = 5001;

app.listen(port, hostName, async () => {
    await connectDatabase()
    console.log("Welcome to NotesApp Backend Service");
    console.log(`http:// 192.168.1.14:${port}`)
});