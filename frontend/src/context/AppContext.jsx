import axios from 'axios'
import { createContext, useEffect, useState } from "react";
// import 'react-native-get-random-values'
import { v4 as uuidv4 } from 'uuid';
// import { data, useNavigate } from 'react-router-dom';
export const AppContext = createContext()

const AppContextProvider = (props) => {

    const backend_Url  = 'https://chatgpt-l1og.onrender.com'
   const [allThreads,setAllThreads] =useState([]) 
   const [prompt,setPrompt] =useState("") 
   const [reply,setReply] =useState(null) 
   const [currThreadId,setCurrThreadId] =useState(uuidv4())
const [loading,setLoading] =useState(false)
const [prevChat,setPrevChat] =useState([])
const [newChat,setNewChat] =useState(true)




  const changeThreadId = async(newThreadId)=>{
    setCurrThreadId(newThreadId);
    try {
      const {data} = await axios.get(`${backend_Url}/api/threads/${newThreadId}`) 
      console.log(data.thread)
      setPrevChat(data.thread)
      setNewChat(false)
      setReply(null)

    } catch (error) {
         console.log(error)
    }

  }



  const createChat = async(e)=>{
     e.preventDefault();

     try {
        setLoading(true)
        setNewChat(false)
        const {data} = await axios.post(`${backend_Url}/api/chat`,{
            message:prompt,
            threadId:currThreadId
        })
        if(data.success){
            setReply(data.geminiReply)
            
          setLoading(false)

            // console.log(data.geminiReply)
        }
    } catch (error) {
        console.log(error)
    }


  }

  useEffect(() => {
    if (prompt && reply) {
      setPrevChat(prevChat => (
        [...prevChat, {
          role: "user",
          content: prompt
        }, {
          role: "assistant",
          content: reply
        }
        ]
      ))
    }


    setPrompt("")
  

  }, [reply])



const deleteThread = async(threadId,createNewChat)=>{
  try {
   const  {data} =await axios.delete(`${backend_Url}/api/threads/${threadId}`);
  //  console.log(data)
  if(data.success){
 setAllThreads(prev =>prev.filter(thread =>thread.threadId !==threadId))
      if(threadId ===currThreadId){
     createNewChat()
      }
  }
    
  } catch (error) {
       console.log(error)
  }
}

  const getAllThreads = async()=>{
    try {
        const {data} = await axios.get(`${backend_Url}/api/threads/all`)
        if(data.success){
            const filterData = data.AllThread.map(thread =>({threadId:thread._id,title:thread.title}))
            
            // console.log(filterData)
            setAllThreads(filterData)
        }
        
    } catch (error) {
        console.log(error)
    }
  } 
 
  useEffect(()=>{
      getAllThreads()
  },[currThreadId])
    

    const value = {
        loading,setLoading,
        backend_Url,
        getAllThreads,
        setAllThreads,
        allThreads,
        prompt,setPrompt,
        reply,setReply,
        createChat,
        prevChat,setPrevChat,
        newChat,setNewChat,
        setCurrThreadId,
        changeThreadId,
        deleteThread,
      
    }

    return (
        <AppContext.Provider value={value}>
            {props.children}
        </AppContext.Provider>
    )

}

export default AppContextProvider
