import axios from "axios";
import React, { useContext, useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { MdEdit } from "react-icons/md";
import { MdDelete } from "react-icons/md";
import { UserContext } from "../context/UserContext";
import { Link } from "react-router-dom";
import Comment from "./Comment";
import {  toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import Loader from "./Loader";
const PostDetail = () => {
  const [loader,setLoader]=useState(false)
  const navigate = useNavigate();
  const postId = useParams().id;
  const handleDelete = async () => {
    try {
      await axios.delete(`${import.meta.env.VITE_URL}/api/v1/blog/` + postId,{withCredentials:true});
      navigate("/");
    } catch (error) {}
  };
  const { user } = useContext(UserContext);
  const [post, setPost] = useState({});
  const [loading,setLoading]= useState(false)
  const [comments, setComments] = useState([]);
  const [comment, setComment] = useState("");

  const fetchPost = async () => {
    setLoader(true)
    try {
      const res = await axios.get(
        `${import.meta.env.VITE_URL}/api/v1/blog/blog/` + postId,
        { withCredentials: true }
      );
      setLoader(false)
      setPost(res.data.post);
    } catch (error) {
      console.log(error);
    }
  };
  useEffect(() => {
    fetchPost();
    postComment();
  }, [postId]);
  const postComment = async () => {
    try {
     
      const res = await axios.get(
        `${import.meta.env.VITE_URL}/api/v1/comment/post/` + postId
      );
     
      setComments(res.data.comments);
    } catch (error) {
    
      console.log(error);
    }
  };
  const createComment = async (e) => {
    e.preventDefault();
    try {
      setLoading(true)
      const res = await axios.post(
        `${import.meta.env.VITE_URL}/api/v1/comment/create`,
        {
          comment: comment,
          author: user?._id,
          postId: postId,
          
        },
        { withCredentials: true }

       
      );
      setLoading(false)
      if(res.data.success){
           postComment();
            toast.success(res.data.message, {
              position: "top-center",
              autoClose: 2000,
              })
      }
    
        setComment("");  
    } catch (error) {
setLoading(false)
console.log(error);
      toast.error(error?.response?.data?.message, {
        position: "top-center",
        autoClose: 2000,
  
        })
    }
  };
  
  return (
   <div>
 {loader?<div className="h-[80vh] flex justify-center items-center w-full"><Loader/></div>: <div className=" pt-28 px-[6px] md:px-32  ">
   <div className=" flex items-center justify-between">
     <h1 className=" mb-7 text-2xl font-bold">{post.title}</h1>
     {user?._id === post?.userId?._id && (
       <div className="flex gap-3 mb-6">
         <Link to={"/edit/" + postId}>
           <MdEdit className=" text-3xl cursor-pointer" />
         </Link>
         <MdDelete
           onClick={handleDelete}
           className=" text-3xl cursor-pointer"
         />
       </div>
     )}
   </div>
   <div className=" flex mb-5 justify-between items-center">
     <h3 className="  font-semibold">@{post?.userId?.username}</h3>
     <div className="flex gap-4">
     <p>{new Date(post.createdAt).toString().slice(0,15)}</p>
       <p>{new Date(post.createdAt).toString().slice(16,24)}</p>
     </div>
   </div>
   <img
     className=" mb-4 w-[100vw] md:w-[80vw] md:h-[60vw]"
     src={post.photo}
     alt=""
   />
   <p>{post.description}</p>
   <div className="flex items-center  md:gap-6 gap-2 mb-6 mt-7">
     <h1 className=" text-[19px] font-semibold ">Categories:</h1>
     <div className="flex items-center gap-4">
       {post.categories?.map((c, i) => (
         <div key={i} className=" bg-gray-300 rounded-md px-2 py-1">
           {c}
         </div>
       ))}
     </div>
   </div>
   <h1 className="text-2xl font-semibold mt-12">Comments:</h1>
   {comments?.map((c) => (
     <Comment fetchCmnt={postComment} c={c} />
   ))}
   <div className="flex items-center gap-2 md:justify-between mt-5 mb-9">
     <input
       onChange={(e) => setComment(e.target.value)} value={comment}
       className=" w-72 md:w-[80vw] outline-none border-2 px-1 py-1 rounded-md"
       type="text"
       placeholder="Write a comment"
     />
     <button
     disabled={loading}
       onClick={createComment}
       type="submit"
       className=" bg-black text-white font-bold py-1.5 px-5 rounded-md"
     >
       {loading ? 'Submitting..' : 'Submit'}
     </button>
   </div>
 </div>}
  
   </div>
)}
export default PostDetail;
