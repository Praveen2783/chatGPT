import { json } from 'express'
import Thread from '../models/thread.js'
import geminiData from '../utils/gemini.js'
import User from '../models/user.js'
export const chat = async (req, res) => {
    const { threadId, message } = req.body

    try {
    //     const user = await User.findById(req.userId);
    //    console.log(user)
    //     if(!user) {return res.json({success:false,message:"User not found!"})}
        if (!threadId || !message) {
            return res.json({ success: false, message: "missing threadId and messages" })
        }
        const thread = await Thread.findOne({ threadId })

        if (!thread) {
            const newthread = await Thread.create({
                threadId,
                title: message,
                // userId:user._id,
                messages: [{
                    role: "user",
                    content: message,
                }]
            });


            const geminiReply = await geminiData(message);
            newthread.messages.push({
                role: "assistant",
                content: geminiReply
            });

            await newthread.save();
            return res.json({ success: true, geminiReply, message: "new thread successfully created!" })
        }
        thread.messages.push({
            role: "user",
            content: message
        })


        const geminiReply = await geminiData(message);

        thread.messages.push({
            role: "assistant",
            content: geminiReply
        });

        await thread.save();
        return res.json({ success: true, geminiReply, message: "thread successfully added!" })
    } catch (error) {
        console.log(error)
        return res.json({ success: false, message: error.message })
    }
}


export const getAllThreads = async (req, res) => {
    try {
        const AllThread = await Thread.find({}).sort({ updatedAt: -1 })
        return res.json({ success: true, AllThread })
    } catch (error) {
        console.log(error)
        return res.json({ success: false, message: error.message })
    }
}


export const getThreadById = async (req, res) => {
    const { threadId } = req.params
    try {
        const thread = await Thread.findById(threadId)
        if (!thread) return res.json({ success: false, message: "Threads  not found" })
        return res.json({ success: true, thread: thread.messages })
    } catch (error) {
        console.log(error)
        return res.json({ success: false, message: error.message })
    }
}
export const deleteThread = async (req, res) => {
    const { threadId } = req.params
    try {
        const deletedThread = await Thread.findOneAndDelete(threadId)
        if (!deletedThread) return res.json({ success: false, message: "Threads  not deleted" })
        return res.json({ success: true, message: "Thread deleted successfully!" })
    } catch (error) {
        console.log(error)
        return res.json({ success: false, message: error.message })
    }
}




