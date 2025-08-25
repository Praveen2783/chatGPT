 import mongoose, { Schema } from 'mongoose';

 const MessageSchema = new mongoose.Schema({
    role: {
        type: String,
        enum:["user",'assistant'],
        required:true 
    },
   content:{
        type:String,
         required: true,
    },
   
},{timestamps:true});

 const ThreadSchema = new mongoose.Schema({
    threadId: {
        type: String,
        unique:true,
        required:true 
    },
    userId: {
        type: Schema.Types.ObjectId,
        ref:"User",
        // required:true 
    },

   title:{
        type:String,
         default:"New Chat",
    },
    messages:[MessageSchema],
   
},{timestamps:true});

const  Thread  =  mongoose.model.Thread || mongoose.model("Thread",ThreadSchema);

export default Thread





