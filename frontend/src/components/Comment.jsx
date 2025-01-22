import React, { useContext, useState } from "react";
import axios from "axios"
import { MdDelete } from "react-icons/md";
import {UserContext} from "../context/UserContext"
const Comment = ({ c,fetchCmnt }) => {
  const handleDelete= async()=>{
    await axios.delete(`${import.meta.env.VITE_URL}/api/v1/comment/`+c._id,{withCredentials:true})
    fetchCmnt()
  }
  const {user}= useContext(UserContext)
  return (
    <div >
      <div className="mt-6 mb-2 ">
        <div className="bg-gray-300 rounded-md px-3 py-2 ">
          <div className="  flex items-center justify-between">
            <h3>@{c?.author?.username}</h3>
            <h5>TimeStamp</h5>
          </div>
          <div className="flex items-center justify-between">
          <h2 className="mt-3">{c.comment}</h2>
         {user?._id === c?.author?._id?  <MdDelete onClick={handleDelete} className=" text-[21px] cursor-pointer" />:""}
          </div>
        </div>
        
      </div>
      
    </div>
  );
};

export default Comment;
