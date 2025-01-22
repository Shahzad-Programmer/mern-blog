import mongoose from "mongoose";
const blogSchema = new mongoose.Schema({
  title:{
    type:String,
    required:true
  },
  description:{
    type:String,
    required:true
  },
  photo:{
    type:String,
    required:false
  },
  
userId:{
    type:mongoose.Schema.ObjectId,
    ref:'Users' 
},

  categories:{
    type:Array
  },
},{timestamps:true})
export default mongoose.model("Blogs",blogSchema)