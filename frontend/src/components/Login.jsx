import React, { useContext, useState } from 'react'
import blogImg from "../assets/blog.png"
import { useNavigate } from "react-router-dom";
import axios from 'axios';
import { UserContext } from '../context/UserContext';
import {  toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const Login = () => {
  const {setUser} = useContext(UserContext)
  const navigate = useNavigate()
  const [loading,setLoading]=useState(false)
  const [inputs,setInputs]= useState({
    email:"",
    password:""
  })
   const handleChange =(e)=>{
     setInputs({...inputs,[e.target.name]:e.target.value})
   }
   const handleSubmit =async(e)=>{

    e.preventDefault();
    
    try {
      setLoading(true)
      const res = await axios.post(`${import.meta.env.VITE_URL}/api/v1/auth/login`,{
        email:inputs.email,
        password:inputs.password
        
      },{withCredentials:true})
     setLoading(false)
      toast('🦄 Login successFully', {
        position: "top-center",
        autoClose: 2000,
        }),
        
      navigate("/"), 
      setUser(res.data)
      
    } catch (error) {
      setLoading(false)

      toast.error(error.response.data.message, {
        position: "top-center",
        autoClose: 2500,
        })
    }
   }

  return (
    <div className='   pt-52 md:pt-28 flex flex-col items-center justify-center'>
      <div><img className='w-11 rounded-md' src={blogImg} alt="" />
      </div>
      <h1 className='text-2xl font-semibold mb-8'>Login to your account</h1>
      <form onSubmit={handleSubmit} className='flex flex-col gap-1 w-[80vw] md:w-[28vw] '>
        <label className='  font-medium' htmlFor="email">Email: </label>
        <input onChange={handleChange} name='email' required className='border-2 py-[2.5px] outline-none mb-2 rounded-md' type="email" />
        <label className='  font-medium' htmlFor="password">Password:</label>
        <input  onChange={handleChange} name='password'  type='password' required className='border-2 rounded-md outline-none py-[2.5px] mb-2'  />
        <button disabled={loading} className={`mt-3 mb-2  ${loading ? ' bg-blue-300' : 'bg-blue-500 hover:bg-blue-700'} text-white font-bold py-2 px-4 rounded-full`} type="submit">{loading ? 'Logging in...' : 'Login'}</button>
        <h1 className=' text-center'>Don't have an account? <button onClick={()=>navigate("/register")} className='  text-blue-500'>Create an account</button></h1>
      
      </form>
    </div>
  )
}

export default Login
