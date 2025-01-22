import React, { useContext, useEffect, useState } from 'react'
import Post from './Post'
import axios from 'axios'
import { Link, useLocation } from "react-router-dom"
import { UserContext } from '../context/UserContext'
import Loader from './Loader'

const Home = () => {
  const {search}=useLocation()
  const [noResults,setNoResults]=useState(false)
  const [loader,setLoader]=useState(false)
  const {user} = useContext(UserContext)
  const [blogs,setBlogs]=useState([])
  useEffect(()=>{
    setLoader(true)
    fetchPost();
  },[search])
  const fetchPost =async()=>{
    
    try {
      const res =await axios.get(`${import.meta.env.VITE_URL}/api/v1/blog/`+search)
      setBlogs(res.data.posts);
      if(res.data.posts.length===0){
        setNoResults(true)
      }
      else{
        setNoResults(false)
      }
      setLoader(false)
    } catch (error) {
      
    }

  }
 
  return (
    <div className='  pt-16'>
      {loader?<div className=' h-[70vh] flex justify-center items-center'><Loader/></div>:!noResults?blogs.map((blog)=>(
        <Link key={blog._id} to={`/post/${blog._id}`}><Post key={blog._id} blogs={blog}/></Link>
      )):<h1 className=' mt-20 text-3xl font-bold text-center'>No Posts Avaliable</h1>}
    </div>
  )
}

export default Home
