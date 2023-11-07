import express from 'express';
import { UserController } from '../controller/user_controller';

const userRouter: express.Router = express.Router();

userRouter.post("/register", UserController.register);
userRouter.post("/login", UserController.login);


export default userRouter;

