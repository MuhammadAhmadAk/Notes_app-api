import express from 'express';
import { UserController } from '../controller/user_controller';

const userRouter: express.Router = express.Router();

userRouter.post("/register", UserController.register);
userRouter.post("/login", UserController.login);
userRouter.get("/myProfile", UserController.myProfile);
userRouter.put("updateProfile", UserController.updateProfile);

export default userRouter;
