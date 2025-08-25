import React, { useContext, useEffect, useState } from 'react';
import { AppContext } from '../context/AppContext';
import { IoIosSend } from "react-icons/io";
import { RiseLoader } from 'react-spinners';
import { TypeAnimation } from 'react-type-animation'
import ReactMarkdown from 'react-markdown'
import RehypeHighlight from 'rehype-highlight'
import 'highlight.js/styles/github-dark.css';
import DropDown from './DropDown';
import { AuthContext } from '../context/AuthContext';
const ChatWindow = () => {
  const {
    prompt,
    setPrompt,
    reply,
    
    createChat,
    loading,
    prevChat,
  
    newChat,
  
  } = useContext(AppContext);
  const [latestReply, setLatestReply] = useState(null)
const {userData ,SignOut} =useContext(AuthContext)

  useEffect(() => {
    if (reply === null) {
      setLatestReply(null);
      return;
    }

    if (!prevChat?.length) return;
    const content = reply.split(" ");
    let idx = 0;
    const interval = setInterval(() => {
      setLatestReply(content.slice(0, idx + 1).join(" "));

      idx++;
      if (idx >= content.length) clearInterval(interval);

    }, 40);
    return () => clearInterval(interval)
  }, [prevChat, reply])




  return (
    <div className="flex-1 flex flex-col bg-[#181f2a] min-h-screen">
      {/* Header */}
      <div className="flex items-center justify-end px-4 py-4 border-b border-gray-800">
        {!userData ?

        <div className=' flex  mr-5 gap-3'>

        <button className='border border-gray-200 px-3  py-1 rounded-2xl hover:bg-black  hover:scale-95  cursor-pointer'>Sign Up</button>     
        <button className='border border-gray-200 px-3  py-1 rounded-2xl hover:bg-black  hover:scale-95 cursor-pointer'>Sign In</button>     
        </div>:
        <DropDown SignOut={SignOut}/>
        }
      </div>
    

      {/* Chat Body */}
      <div className="flex-1 flex flex-col gap-4 p-4 md:p-8  overflow-auto  scrollbar-hide   ">
        {/* Example Chat Bubbles */}

        {newChat &&
          <p className='flex justify-center text-gray-400 text-3xl'>What's on your mind today?</p>

        }

        {prevChat?.slice(0, -1).map((chat, i) => (

          <div className={" flex flex-col gap-4 max-w-3xl mx-auto w-full"} key={i}>
            {/* User Message */}


            {chat.role === 'user' ?
              <div className={" self-end max-w-[80%]"}>

                <div className="bg-indigo-600 text-white rounded-2xl px-5 py-3 shadow-md">


                  {chat.content}
                </div>


              </div>

              :
              <div className={"ai self-start max-w-[100%]"}>

                {
                  // prevChat.length > 0 && latestReply !== null &&
                  <div className="bg-gray-700 text-gray-100 rounded-2xl px-5 py-3 shadow-md ">

                    <ReactMarkdown rehypePlugins={RehypeHighlight}>

                      {chat.content}
                    </ReactMarkdown>

                  </div>
                }
              </div>
            }

          </div>
        ))}


        <div className={" self-start  flex flex-col gap-4 max-w-3xl mx-auto w-full"}>

          {prevChat.length > 0 &&
            (
              <>

                {
                  latestReply === null ? (
                    <div className="bg-gray-700 text-gray-100 rounded-2xl px-5 py-3 shadow-md " key={"non-typing"}>

                      <ReactMarkdown rehypePlugins={RehypeHighlight}>

                        {prevChat[prevChat.length - 1].content}
                      </ReactMarkdown>

                    </div>
                  ) : (
                    <div className="bg-gray-700 text-gray-100 rounded-2xl px-5 py-3 shadow-md " key={"typing"}>

                      <ReactMarkdown rehypePlugins={RehypeHighlight}>

                        {latestReply}
                      </ReactMarkdown>

                    </div>
                  )
                }

              </>
            )
          }
        </div>



        {/* Loader */}
        {loading && (
          <div className="flex justify-center items-center py-4">
            <RiseLoader color="#50cf30" loading={loading} />
          </div>
        )}
      </div>

      {/* Input Area */}
      <form
        onSubmit={createChat}
        className="w-full px-4 py-4 bg-[#181f2a] border-t border-gray-800"
      >
        <div className="flex items-center max-w-3xl mx-auto w-full gap-2">
          <input
            value={prompt}
            onChange={(e) => setPrompt(e.target.value)}
            type="text"
            placeholder="Ask Anything"
            className="flex-1 bg-gray-900 text-sm px-4 py-3 rounded-3xl outline-none border border-gray-700 focus:border-indigo-500 h-12 text-white"
          />
          {prompt &&

            <button
              type="submit"
              className="bg-indigo-600 hover:bg-indigo-700 text-white rounded-full p-3 text-2xl flex items-center justify-center transition"
            >
              <IoIosSend />
            </button>
          }
        </div>
      </form>
    </div>
  );
};

export default ChatWindow;