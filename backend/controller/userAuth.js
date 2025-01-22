import userModel from "../models/userModel.js";
import bcrypt from "bcrypt";
import blogModel from "../models/blogModel.js";
import commentModel from "../models/commentModel.js";
const updateUser = async (req, res) => {
  try {
    if (req.body.password) {
      req.body.password = await bcrypt.hash(req.body.password, 10);
    }
    const updateUser = await userModel.findByIdAndUpdate(
      req.params.id,
      { $set: req.body },
      { new: true }
    );
    return res.status(200).json({
      success: true,
      message: "Updated user successfully",
      updateUser,
    });
  } catch (error) {}
};
const deleteUser = async (req, res) => {
  try {
    await userModel.findByIdAndDelete(req.params.id);
    await blogModel.deleteMany({ userId: req.params.id });
    await commentModel.deleteMany({ userId: req.params.id });
    return res.status(200).json({ message: "User has been delted" });
  } catch (error) {}
};
const getUser = async (req,res)=>{
     try {
      const user = await userModel.findById(req.params.id);
      return res.status(200).json({
        success:false,
        message:"User details",
        user
      })
     } catch (error) {
      
     }
}
export { updateUser, deleteUser, getUser };
