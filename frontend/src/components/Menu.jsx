import React, { useContext } from 'react'
import { Link } from 'react-router-dom'
import { UserContext } from '../context/UserContext'
import axios from 'axios'
import {useNavigate} from "react-router-dom"
const Menu = () => {
  const navigate= useNavigate();
  const {user} =useContext(UserContext)
  const {setUser} =useContext(UserContext)

  const handleLogout=async()=>{
    try {
      const res = await axios.post(`${import.meta.env.VITE_URL}/api/v1/auth/logout`,{},{withCredentials:true});
         setUser(null);
         navigate("/login")
    }
       catch (error) {
      console.log(error);
    }
  }
  return (
    <div  className=' bg-gray-900 w-[160px] md:w-[200px]  flex flex-col md:right-14 md:gap-11 gap-8 px-3 py-5  absolute top-8 right-7'>
        {!user && <h3 className=' text-xl text-white hover:text-gray-300 font-medium '><Link to={"/login"}>Login</Link></h3>}
        {!user && <h3 className='text-xl text-white hover:text-gray-300 font-medium '><Link to={"/register"}>Register</Link></h3>}
        {user && <h3 className='text-xl text-white hover:text-gray-300 font-medium '><Link to={"/create"}>Write</Link></h3>}
        {user && <h3 className='text-xl text-white hover:text-gray-300 font-medium '><Link to={`/profile/${user._id}`}>Profile</Link></h3>}
        {user && <h3 className='text-xl text-white hover:text-gray-300 font-medium '><Link to={"/my-blog/"+user._id}>My Blogs</Link></h3>}
        {user && <h3 onClick={handleLogout} className='text-xl text-white hover:text-gray-300 font-medium '><Link to={"/login"}>Logout</Link></h3>}
    </div>
  )
}

export default Menu
