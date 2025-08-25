import React, { useContext } from 'react'
import { Navigate, Route, Routes } from 'react-router-dom'
import './App.css'
import ChatWindow from './components/ChatWindow'
import SidebarLayout from './components/Sidebar'
import SignUp from './components/SignUp'
import SignIn from './components/SignIn'
import { ToastContainer } from 'react-toastify'
import { AuthContext } from './context/AuthContext'




function App() {
const {userData,setUserData} =useContext(AuthContext);
// console.log(userData)

  return (
    <>

{/* <SidebarLayout/> */}
  <ToastContainer/>
     <Routes>
        <Route path='/'element={(userData)?<SidebarLayout/>:<Navigate to={"/signin"}/>}/>
        <Route path='/signup'element={!userData?<SignUp/>:<Navigate to={"/"}/>}/>
        <Route path='/signin'element={ !userData?<SignIn/>:<Navigate to={"/"}/>}/>
      
       
       </Routes> 
    </>
  )
}

export default App
