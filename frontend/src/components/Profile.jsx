import React, { useContext, useEffect, useState } from 'react'
import axios from "axios"
import { useNavigate } from 'react-router-dom'
import { UserContext } from '../context/UserContext'
import {  toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import Loader from './Loader';
const Profile = () => {
  const [loader,setLoader]=useState(false)
  const navigate = useNavigate();
  const [username,setUsername]= useState("")
  const [email,setEmail]= useState("")
  
  const {user}= useContext(UserContext)
  const fetchUser = async ()=>{
    setLoader(true)
   try {
    const res=await axios.get(`${import.meta.env.VITE_URL}/api/v1/user/`+user._id,{withCredentials:true})
    setUsername(res.data.user.username)
    setEmail(res.data.user.email)
    setLoader(flase)
   } catch (error) {
     setLoader(false)
   }
  }
  const handleSunmit = async(e)=>{
   try {
    e.preventDefault();
    const res = await axios.put(`${import.meta.env.VITE_URL}/api/v1/user/`+user._id,{username,email},{withCredentials:true})
    toast('🦄 Profile Updated Successfully', {
      position: "top-center",
      autoClose: 2000,
      })
      navigate(`/profile/${user._id}`)
    
   } catch (error) {
    console.log(error);
   }
    
  }
  useEffect(()=>{
fetchUser()
  },[user])
  return (
    <>
     {loader? <div className='h-[80vh] flex justify-center items-center w-full'><Loader/></div>:<div className='mt-40 '>
    <h1 className=' text-center  text-4xl font-semibold'>Update Your Profile</h1>
    <div className='flex mt-5  items-center justify-center' >

      
<form className=' flex flex-col gap-1 w-[80vw] md:w-[28vw]'>
  <label htmlFor="username">Username:</label>
  <input onChange={(e)=>setUsername(e.target.value)} value={username} className=' border-2 rounded-md outline-none' type="text"  />
  <label htmlFor="email">Email:</label>
  <input onChange={(e)=>setEmail(e.target.value)} value={email} className=' border-2 rounded-md outline-none' type="text" />
  <button onClick={handleSunmit} type='submit' className=' mt-2 bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded-full'>Update</button>
</form>
</div>
    </div>}
    </>
  )
}

export default Profile