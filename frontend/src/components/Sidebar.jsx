import React, { useContext,  } from "react";
import { Home, Settings } from "lucide-react";
import ChatWindow from "./ChatWindow";
import { AppContext } from "../context/AppContext";
import { Link} from 'react-router-dom'
// import 'react-native-get-random-values'
import { v4 as uuidv4 } from 'uuid';
import { MdDelete } from "react-icons/md";


function SidebarLayout() {


  const { changeThreadId,allThreads,setPrevChat, setPrompt, setReply, setNewChat ,setCurrThreadId ,currThreadId ,deleteThread} = useContext(AppContext)
  const menuItems = [
    { name: "New Chat", icon: <Home size={18} /> },

  ];

  const createNewChat = () => {
    setNewChat(true)
    setPrompt("")
    setReply(null)
    setCurrThreadId(uuidv4())
    setPrevChat([])
  }


  return (
    <div className="flex h-screen bg-[#0f172a] text-gray-200">
      {/* Sidebar */}
      <div className="   w-64 flex flex-col p-4 border-r border-gray-800">
        {/* Logo */}
        <div className="flex items-center gap-2 mb-8">
          <div className="w-6 h-6 bg-indigo-500 rounded" />
        </div>

        {/* Menu */}
        <nav className="space-y-2">
          {menuItems.map((item) => (
            <button
              key={item.name}
              onClick={createNewChat}
              className={` flex items-center gap-3 cursor-pointer w-full px-3 py-2 rounded-md transition text-sm font-medium
                 hover:text-white hover:bg-gray-800`}>
              {item.icon}
              {item.name}
            </button>
          ))}
        </nav>

        {/* Teams */}
        <div className="mt-8">
          <p className="text-xs font-semibold text-gray-500 mb-3">Your History</p>
          <div className="">
            {allThreads.map((thread) => (
              <button
              onClick={()=>changeThreadId(thread.threadId)}
                key={thread.threadId}
                className={` relative flex flex-col gap-1 w-full  py-1 rounded-md text-sm text-gray-400  justify-between `}
              >
                <ul

                  className={`flex text-xs font-bold   hover:text-white hover:bg-gray-800 rounded-2xl   justify-items-start  cursor-pointer  `}>
                  {/* <Link to={`/${thread.threadId}`}> */}
                    <li className={` py-1 px-1 ml-1 flex  ${thread.threadId === currThreadId?"bg-gray-800":""}`}>
                      {thread.title}
              
                      <MdDelete onClick={(e)=>{
                        e.stopPropagation();
                        deleteThread(thread.threadId,createNewChat)}} className={` hover:text-red-900 absolute right-2  text-[16px]  `}/>
                    </li>
                    
                  {/* </Link> */}
                </ul>



              </button>
            ))}
          
          </div>
        </div>

        {/* Settings */}
        <div className="mt-auto">
          <button className="flex items-center gap-3 w-full px-3 py-2 rounded-md text-sm text-gray-400 hover:text-white hover:bg-gray-800">
            <Settings size={18} />
            Settings
          </button>
        </div>
      </div>

      <ChatWindow />
    </div>
  );
}

export default SidebarLayout;
