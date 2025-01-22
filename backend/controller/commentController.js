import commentModel from "../models/commentModel.js";
const createComment =async (req,res)=>{
    try {
      const newComment = new commentModel(req.body);
      const savedComment =await newComment.save();
      return res.status(201).json({
       success:true,
       message:"Comment created successfully",
       savedComment
      })
    } catch (error) {
      return res.status(500).json({
        success:false,
        message:"Internal server error"
      })
    }
}
const updateComment =async(req,res)=>{
  try {
    const updatedComment = await commentModel.findByIdAndUpdate(req.body.params,{$set:req.body},{new:true});
    res.status(200).json({
      success:true,
      message:"Comment updated successfully",
      updatedComment
    })
  } catch (error) {
    return res.status(500).json({
      success:false,
      message:"Internal server error"
    })
  }
} 
const deleteComment = async (req,res)=>{
  try {
    const deletecmnt = await commentModel.findByIdAndDelete(req.params.id);
  return res.status(200).json({
    success:true,
    message:"Comment has been deleted successfully"
  })
  } catch (error) {
    return res.status(500).json({
      success:false,
      message:"Internal server error"
    })
  }
}
const postComments = async (req,res)=>{
  const comments =await commentModel.find({postId:req.params.postId}).populate('author',('-password'));
  return res.status(200).json({
    success:true,
    message:"Post comments",
    comments
  })
}
export {postComments,updateComment,createComment,deleteComment}