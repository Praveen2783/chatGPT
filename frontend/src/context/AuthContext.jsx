import axios from 'axios'
import { createContext, useContext, useEffect, useState} from "react";
import { AppContext } from './AppContext';
import { toast } from 'react-toastify';
import { useNavigate } from 'react-router-dom';

export const AuthContext = createContext()

const AuthContextProvider = (props) => {
const navigate = useNavigate()
    const {backend_Url } = useContext(AppContext)
     const [form, setForm] = useState({ name: '', email: '', password: '' })
     const [signinForm, setSigninForm] = useState({  email: '', password: '' })
     const [userData,setUserData] =useState(null) 

   const SignUp=  async(e)=>{
        e.preventDefault()
      try {
        const {data } =await axios.post(`${backend_Url}/api/user/signup`,form,{withCredentials:true})
        if(data.success){
            setForm({ name: '', email: '', password: '' })
            toast.success(data.message)
            navigate("/signin")
        }
        toast.error(data.message)
        // console.log(data)
      } catch (error) {
          toast.error(error.message)
      }
   }

   const SignIn=  async(e)=>{
        e.preventDefault()
      try {
        const {data } =await axios.post(`${backend_Url}/api/user/signin`,signinForm,{withCredentials:true})
        // console.log(data)
        if(data.success){
            setSigninForm({  email: '', password: '' })
            toast.success(data.message)
            // setUserData(data.existUser)
            navigate('/')
            navigate(0)

        }else{
          toast.error(data.message)
        }
        // console.log(data)
      } catch (error) {
          toast.error(error.data.message)
      }
   }
   
   const getCurrUser =  async()=>{
    
      try {
        const {data } =await axios.get(`${backend_Url}/api/user/curr-user`,{withCredentials:true})
        // console.log(data)
        if(data.success){  
            setUserData(data.user)

        
        }else{
          toast.error(data.message)
        }
        // console.log(data)
      } catch (error) {
          toast.error(error.data.message)
      }
   }
   const SignOut =  async()=>{
    
      try {
        const {data } =await axios.get(`${backend_Url}/api/user/signout`,{withCredentials:true})
        // console.log(data)
        if(data.success){  
            toast.success(data.message)
            navigate("/signin")
            setUserData(null);
            navigate(0)
        
        }else{
          toast.error(data.message)
        }
        // console.log(data)
      } catch (error) {
          toast.error(error.data.message)
      }
   }
   


 useEffect(()=>{
   getCurrUser()
 },[])


    const value = {
      form, setForm,
      SignUp,
      SignIn,
      signinForm, setSigninForm,
      userData,setUserData,
      SignOut
    }

    return (
        <AuthContext.Provider value={value}>
            {props.children}
        </AuthContext.Provider>
    )

}

export default AuthContextProvider