import blogModel from "../models/blogModel.js"
import commentModel from "../models/commentModel.js"

import dotenv from "dotenv";
dotenv.config();

          

const createBlog =async(req,res)=>{
      try {
        const newPost = new blogModel(req.body);
      const savedPost =await newPost.save();
      return res.status(201).json({
        success:true,
        message:"Post Created successfully",
        savedPost
      })
      } catch (error) {
        return res.status(500).json({
          success:false,
          message:"Internal server error"
        })
      }
}


const updateBlog =async(req,res)=>{
      try {
        const updatedBlog = await blogModel.findByIdAndUpdate(req.params.id,{$set:req.body},{new:true});
      return res.status(200).json({
        success:true,
        message:"Post Updated Successfully",
        updatedBlog
      })
      } catch (error) {
        return res.status(500).json({
          success:false,
          message:"Internal server error"
        })
      }
}
const deleteBlog= async(req,res)=>{
       try {
        await blogModel.findByIdAndDelete(req.params.id);
       await commentModel.deleteMany({postId:req.params.id})
       res.status(200).json({success:true,message:"Post has been deleted"})
       } catch (error) {
        return res.status(500).json({
          success:false,
          message:"Internal server error"
        })
      }
}
const getBlog = async (req,res)=>{
     try {
       const post = await blogModel.findById(req.params.id).populate('userId',('-password'));
       return res.status(200).json({
        success:true,
        message:"Single Blog details",
        post
       })
     } catch (error) {
      return res.status(500).json({
        success:false,
        message:"Internal server error"
      })
    }
}
const getBlogs = async (req,res)=>{
  
  try {
    
    const posts = await blogModel.find({}).populate('userId',('-password'));
  return res.status(200).json({
    success:true,
    posts
  })
  } catch (error) {
    return res.status(500).json({
      success:false,
      message:"Internal server error"
    })
  }
}
const userBlogs = async (req,res)=>{
  try {
    const userBlogs = await blogModel.find({userId:req.params.userId}).populate('userId',('-password'));
  return res.status(200).json({
    userBlogs
  })
  } catch (error) {
    return res.status(500).json({
      success:false,
      message:"Internal server error"
    })
  }
}
const searchBlogController = async(req,res)=>{
  const query=  req.query.q;
  const regex= new RegExp(query,'i','g');
  const blogs= await blogModel.find({
"$or":[
  {
    title : regex
},
{
    description : regex
}
]
  })
  res.json({ 
    success : true,
    message : "Search Blog list",
    data  : blogs 
   
   
})
}
export {createBlog,updateBlog,deleteBlog,userBlogs,getBlog,getBlogs,searchBlogController}