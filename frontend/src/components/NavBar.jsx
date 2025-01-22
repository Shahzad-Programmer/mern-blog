import React, { useContext, useState } from 'react'
import { Link, useLocation, useNavigate } from "react-router-dom"
import blogImg from "../assets/blog.png"
import { MdMenu } from "react-icons/md";
import {BsSearch} from 'react-icons/bs'

import Menu from './Menu';
import { UserContext } from '../context/UserContext';
const NavBar = () => {
  const [prompt,setPrompt]=useState("")
const navigate=useNavigate()
const path=useLocation().pathname
  const {user}= useContext(UserContext)
  
  const [menu,setMenu] = useState(false)
  const showMenu= ()=>{
    setMenu(!menu)
  }
  const searchInput = useLocation()
  
  const URLSearch = new URLSearchParams(searchInput?.search)
  const searchQuery = URLSearch.getAll("q")
  const [search,setSearch] = useState(searchQuery)
 const handleChange = (e)=>{
const {value}= e.target
setSearch(value)
 }
 const handleSubmit =(e)=>{
  
  e.preventDefault()
  if(search !== ""){
    navigate(`/search?q=${search}`)
  }
  else{
    navigate("/")
  }
 
}
  return (
    <nav className='py-5 px-[3px] md:px-7 flex items-center justify-between shadow-md w-screen fixed bg-white h-20 top-0 z-10'>
        <Link className='flex items-center gap-[2px]' to={'/'}>
        <img className=' w-6 md:w-9 h-8 md:h-9' src={blogImg} alt="" />
        <h1 className=' text-[19px] md:text-2xl font-bold'>LOG</h1>
        </Link>
      <div className='flex items-center space-x-1 '>
      <p onClick={handleSubmit} className="    cursor-pointer"><BsSearch className=' text-[22px] '/></p>
        <input value={search} onChange={handleChange} className=' md:ml-14 py-[6px] outline-none px-1 w-40 md:w-72 font-medium border rounded-md border-gray-200' type="text" name="" id="" placeholder='Search Blogs' />
      </div>
      <div className=' hidden md:flex items-center gap-3 md:gap-7'>
       {user?  <h3 className=' font-medium text-[16px] md:text-[19px]'><Link to={"/create"}>Write</Link></h3> :  <h3 className=' font-medium text-[16px] md:text-[19px]'><Link to={"/login"}>Login</Link></h3>}
       {user ? <div onClick={showMenu}>
        <MdMenu className= ' relative text-3xl cursor-pointer'/>
        {menu && <Menu/>}
       </div>  :  <h3 className=' font-medium text-[15.5px] md:text-[18.5px]'><Link to={"/register"}>Register</Link></h3>}
      </div>
      <div className='md:hidden' onClick={showMenu}>
      <MdMenu  className='  relative cursor-pointer text-3xl'/>
      {menu && <Menu/>}
      </div>
    </nav>
  )
}

export default NavBar
