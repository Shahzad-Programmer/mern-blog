import React, { useState } from 'react'
import { useNavigate } from "react-router-dom";
import blogImg from "../assets/blog.png"
import axios from "axios"
import {  toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
const Register = () => {
  const navigate = useNavigate();
  const [loading,setLoading]=useState(false)
  const [inputs,setInputs]=useState({
    username:"",
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
      const res= await axios.post(`${import.meta.env.VITE_URL}/api/v1/auth/register`,{
        username :inputs.username,
        email:inputs.email,
        password:inputs.password,
        
      })
      setLoading(false)
      toast('🦄 Signup Successfully', {
        position: "top-center",
        autoClose: 2500,
        }),
      navigate("/login")
    
    } catch (error) {
      setLoading(false)
      toast.error(error.response.data.message, {
        position: "top-center",
        autoClose: 2000,
        })
    } 
  }
  return (
    <div className=' pt-52 md:pt-28 flex flex-col items-center justify-center'>
      <div className='f'><img className='w-11 rounded-md' src={blogImg} alt="" />
      </div>
      <h1 className='text-2xl font-semibold mb-8'>Create an account</h1>
      <form onSubmit={handleSubmit} className='flex flex-col gap-1 w-[80vw] md:w-[28vw] '>
        <label className='  font-medium' htmlFor="username">Username: </label>
        <input name='username' required onChange={handleChange}  className='border-2 py-[2.5px] mb-2 outline-none rounded-md' type="text" />
        <label className='  font-medium' htmlFor="email">Email: </label>
        <input name='email' required onChange={handleChange}  className='border-2 py-[2.5px] outline-none mb-2 rounded-md' type="email" />
        <label className='  font-medium' htmlFor="password">Password:</label>
        <input name='password' required onChange={handleChange}  className='border-2 rounded-md outline-none py-[2.5px] mb-2' type="password" />
        <button disabled={loading} className={`mt-3 ${loading ? ' bg-blue-300':' bg-blue-500  hover:bg-blue-700 '} mb-2 text-white font-bold py-2 px-4 rounded-full`} type="submit">{loading ? 'Signing up...' : 'Sign Up'}</button>
        <h1 className=' text-center'>Already have account? <button onClick={()=>navigate("/login")} className='  text-blue-500'>Login here</button></h1>
      </form>
    </div>
  )
}

export default Register
