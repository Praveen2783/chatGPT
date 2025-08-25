import express  from "express";
import {getAllUser, getCurrentUser, SignIn, SignOut, SignUp } from "../controller/userController.js";
import isAuth from "../middleware/isAuth.js";




const userRouter = express.Router();


userRouter.post("/signup",SignUp);
userRouter.post("/signin",SignIn);
userRouter.get("/signout",SignOut);
userRouter.get("/curr-user",isAuth,getCurrentUser);
userRouter.get("/all-user",getAllUser);




export default userRouter