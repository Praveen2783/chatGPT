import express  from "express";
import { chat, deleteThread, getAllThreads, getThreadById } from "../controller/chat.js";
import isAuth from '../middleware/isAuth.js'


const chatRouter = express.Router();


chatRouter.post("/chat",chat);
chatRouter.get("/threads/all",getAllThreads);
chatRouter.get("/threads/:threadId",getThreadById);
chatRouter.delete("/threads/:threadId",deleteThread);



export default chatRouter