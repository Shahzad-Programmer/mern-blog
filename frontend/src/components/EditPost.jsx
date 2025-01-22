
import {ImCross} from 'react-icons/im'
import { useContext, useEffect, useState } from 'react'
import { UserContext } from '../context/UserContext'
import axios from 'axios'
import {  useNavigate, useParams } from 'react-router-dom'
import {  toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const EditPost = () => {
  const postId =useParams().id
  const upload_preset="shahzad";
    const [title,setTitle]=useState("")
    const [description,setDescription]=useState("")
    const [photo,setPhoto]=useState("")
    const  {user}=useContext(UserContext)
    const [cat,setCat]=useState("")
    const [cats,setCats]=useState([])

    const navigate=useNavigate()

    const deleteCategory=(i)=>{
       let updatedCats=[...cats]
       updatedCats.splice(i)
       setCats(updatedCats)
    }

    const addCategory=()=>{
        let updatedCats=[...cats]
        cat===""?"": updatedCats.push(cat)
        setCat("")
        setCats(updatedCats)
    }

    const fetchPost=async ()=>{
      
     

       
        try{
          const res=await axios.get(`${import.meta.env.VITE_URL}/api/v1/blog/blog/`+postId,{withCredentials:true})
          setTitle(res.data.post.title)
          setPhoto(res.data.post.photo)
          setDescription(res.data.post.description)
          setCats(res.data.post.categories)
        
          

        }
        catch(err){
          console.log(err)
        }
    }
    const handleUpdate=async (e)=>{
      e.preventDefault()
      const post={
        title:title,
        photo:photo,
        description,

        userId:user._id,
        categories:cats
      }
         
     
      try{
        const res=await axios.put(`${import.meta.env.VITE_URL}/api/v1/blog/`+postId,post,{withCredentials:true})
        toast('🦄 Updated successFully', {
          position: "top-center",
          autoClose: 2500,
          })
        navigate("/post/"+res.data.updatedBlog._id)
       

      }
      catch(err){
       console.log(err);
      }

      
  }
  const hadnleImage = async(e)=>{
    const file  = e.target.files[0];
    let formData  = new FormData();
    formData.append("file",file);
    formData.append("cloud_name","ddoxouab2")
    formData.append("upload_preset",upload_preset)
    try {
     const {data}= await axios.post("https://api.cloudinary.com/v1_1/ddoxouab2/image/upload",formData)
     setPhoto(data.secure_url,data.original_filename)
    } catch (error) {
     
    }
}

useEffect(()=>{
  fetchPost()
},[])

  return (
    <div>
        
        <div className='px-6 md:px-[200px] mt-28 md:mt-24'>
        <h1 className='font-bold md:text-2xl text-xl text-center '>Create a post</h1>
        <form className='w-full flex flex-col space-y-6 md:space-y-6 mt-2'>
          <input onChange={(e)=>setTitle(e.target.value)} value={title} type="text" placeholder='Enter post title' className=' rounded-md border-2 px-4 py-2 outline-none'/>
          <input onChange={hadnleImage}   type="file"  className=' rounded-md  border-2 px-4 py-2 outline-none'/>
          <div className='flex flex-col'>
            <div className='flex items-center space-x-4 md:space-x-6'>
                <input value={cat} onChange={(e)=>setCat(e.target.value)} className='rounded-md border-2 px-4 py-2 outline-none' placeholder='Enter post category' type="text"/>
                <div onClick={addCategory} className='bg-black text-white px-4 py-2 font-semibold cursor-pointer'>Add</div>
            </div>

            {/* categories */}
            <div className='flex px-4 mt-3'>
            {cats?.map((c,i)=>(
                <div key={i} className='flex justify-center items-center space-x-2 mr-4 bg-gray-200 px-2 py-1 rounded-md'>
                <p>{c}</p>
                <p onClick={()=>deleteCategory(i)} className='text-white bg-black rounded-full cursor-pointer p-1 text-sm'><ImCross/></p>
            </div>
            ))}
            
            
            </div>
          </div>
          <textarea onChange={(e)=>setDescription(e.target.value)} value={description} rows={5} cols={30} className='rounded-md border-2 px-4 py-2 outline-none' placeholder='Enter post description'/>
          <button onClick={handleUpdate} className='bg-black w-full md:w-[20%] mx-auto text-white font-semibold px-4 py-2 md:text-xl text-lg'>Update</button>
        </form>

        </div>
        
    </div>
  )
}

export default EditPost