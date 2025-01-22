import mongoose from "mongoose";
const commentSchema = new mongoose.Schema({
  comment:{
    type:String,
    required:true
  },
  author:{
    type:mongoose.Schema.ObjectId,
    ref:'Users'
  },
  postId:{
    type:mongoose.Schema.ObjectId,
    ref:"Blogs"
  }
})
export default mongoose.model("Comments",commentSchema)