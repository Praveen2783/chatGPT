import express from "express";
import cors from 'cors'
import axios from "axios";
import 'dotenv/config'
import connectDb from "./utils/dbConnected.js";
import chatRouter from "./routes/chatRouter.js";
import userRouter from "./routes/userRouter.js";
import cookieParser from "cookie-parser";
const app = express();
const PORT = 8000;


app.use(express.json());
app.use(cors({
    origin:"https://chatgpt-1-sd7d.onrender.com",
    credentials:true}))
app.use(express.urlencoded({extended:true}))
app.use(cookieParser())
    

app.use("/api",chatRouter)
app.use("/api/user",userRouter)

app.listen(PORT,()=>{
  connectDb()
  console.log(`Server running on ${PORT}`);
})



// app.get("/test",async(req,res)=>{
   
//  const data =  await geminiData()
//  res.json(data)
 
// })



// const geminiData = async()=>{
//  try {
//    const resp = await axios.post(process.env.GEMINI_URL,{
//      "contents": [
//       {
//         "parts": [
//           {
//             "text": "how are you"
//           }
//         ]
//       }
//     ]
//    })
 
//   return resp.data
//   } catch (error) {
//     console.log(error)
//   }
// }
