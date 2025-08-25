import React, { useState } from 'react'
import { Link} from 'react-router-dom'

import { FaEyeSlash } from "react-icons/fa";
import { FaEye } from "react-icons/fa";
import { useContext } from 'react';

import { AuthContext } from '../context/AuthContext';

const SignIn = () => {

  const [showPassword, setShowPassword] = useState(false)

  const {SignIn,signinForm, setSigninForm} =useContext(AuthContext);

  const handleChange = e => {
    setSigninForm({ ...signinForm, [e.target.name]: e.target.value })
  }


  // const handleSubmit = async e => {
  //   e.preventDefault()
  //   try {
  //     const  {data}  = await axios.post(backendUrl + '/api/auth/login', form,{withCredentials:true})
  //     if (data.success) {
  //       toast.success(data.message)
  //       setUserData(data)
  //         navigate('/')
  //         navigate(0)
  //     } else {
  //       toast.error(data.message)
  //     }
  //   } catch (error) {
  //     toast.error(error.message)
  //   }
  // }

  return (
    <div
      className="min-h-screen flex bg-[#0f172a] items-center justify-center bg-[url(assets\authBg.png)] bg-no-repeat bg-cover bg-center"
     
    >
      <div className="absolute inset-0  bg-opacity-60 z-0"></div>
      <div className="relative z-10 w-full max-w-md">
        <div className="bg-black/40 rounded-2xl shadow-2xl px-8 py-10 backdrop-blur-md">
          <h2 className="text-3xl font-bold text-white mb-6 text-center">
            Welcome <span className="text-blue-400">Back!</span>
          </h2>
          <form onSubmit={SignIn} className="space-y-6">
            <div>
              <input
                type="email"
                name="email"
                value={signinForm.email}
                onChange={handleChange}
                required
                className="w-full px-5 py-3 rounded-full border border-gray-400 bg-transparent text-white placeholder-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-400 transition"
                placeholder="Email"
              />
            </div>
            <div className="relative">
              <input
                type={showPassword ? "text" : "password"}
                name="password"
                value={signinForm.password}
                onChange={handleChange}
                required
                className="w-full px-5 py-3 rounded-full border border-gray-400 bg-transparent text-white placeholder-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-400 transition"
                placeholder="password"
              />
              <button
                type="button"
                className="absolute right-4 top-1/2 transform -translate-y-1/2 text-gray-300 hover:text-blue-400"
                onClick={() => setShowPassword(!showPassword)}
                tabIndex={-1}
              >
                {showPassword ? (
                <FaEye/>
                ) : (
              <FaEyeSlash/>
                )}
              </button>
            </div>
            <button
              type="submit"
              className="w-full py-3 rounded-full bg-white text-black font-semibold text-lg shadow-lg hover:bg-blue-400 hover:text-white transition"
            >
              Login
            </button>
          </form>
          <div className="mt-6 text-center text-sm text-gray-300">
            Don't have an account?{' '}
            <Link to="/signup" className="text-blue-400 font-semibold hover:underline">
              Sign Up
            </Link>
          </div>
        </div>
      </div>
    </div>
  )
}

export default SignIn