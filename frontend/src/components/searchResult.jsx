import React, {  useEffect, useState } from 'react'
import { Link } from 'react-router-dom'
import Post from './Post'
import { useLocation } from 'react-router-dom'
import axios from 'axios'

import Loader from './Loader'

const SearchResult = () => {
  const query= useLocation();
    
    const [loader,setLoader]=useState(false)
    const [blogs,setBlogs]=useState([])

   const fetchProducts = async()=>{
   try {
    setLoader(true)
    const { data } =await axios.get(`${import.meta.env.VITE_URL}/api/v1/blog/search${query.search}`)
    setBlogs(data.data)
    setLoader(false)
   } catch (error) {
    setLoader(false)
   }

   }
   useEffect(()=>{
  fetchProducts();
   },[query])
   
   
   return (
   <>
   {
    loader ? <div className=' h-[70vh] flex justify-center items-center'><Loader/></div>: <> <div className='pt-24 '><h1 className=' text-center  text-3xl font-poppins font-bold'>{blogs === " " && blogs <1 ? "No Blogs Found":`Found ${blogs?.length} Blogs`}</h1>
    <div className=' w-full  px-2'>
    {blogs?.map((blog)=>  (
     <Link key={blog._id} to={`/post/${blog._id}`}><Post key={blog._id} blogs={blog}/></Link>
      ))}
    </div>
      
    </div></>
   }
   </>
  )
}

export default SearchResult