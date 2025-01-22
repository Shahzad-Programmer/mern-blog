import userModel from "../models/userModel.js";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken"
import dotenv from "dotenv"

dotenv.config()
const signupUser = async (req, res) => {
  try {
    const { username, email, password } = req.body;
    // validation
    if (!username || !email || !password) {
      return res.status(401).json({
        success: false,
        message: "Please Provide Required fields",
      });
    }
    // checking email
    const emailCheck = await userModel.findOne({ email });
    if (emailCheck) {
      return res.status(401).json({
        success: false,
        message: "Email is already registered",
      });
    }
    // checking username
    const usernameCheck = await userModel.findOne({ username });
    if (usernameCheck) {
      return res.status(401).json({
        success: false,
        message: "Username is already registered",
      });
    }
    // hashing password
    const hashedPassword = await bcrypt.hash(password, 10);
    // saving new user
    const newUser = new userModel({
      username,
      email,
      password: hashedPassword,
    });
    await newUser.save();
    return res.status(201).json({
      success: true,
      message: "User created Successfully",
    });
  } catch (error) {
    return res.status(500).json({
      success: false,
      message: "Internal server error",
    });
  }
};
const loginUser = async (req,res) => {
  const {email,password}=req.body;
  // validation
  if(!email || !password){
    return res.status(401).json({
      success:false,
      message:"Please provide required fields"
    })
  }
  // emailcheck
  const emailCheck = await userModel.findOne({email});
  if(!emailCheck){
    return res.status(401).json({
      success:false,
      message:"Email is incorrect"
    })
  }
  // password check
  const passwordCheck = await bcrypt.compare(password,emailCheck.password);
  if(!passwordCheck){
    return res.status(401).json({
      success:false,
      message:"Password is incorrect"
    })
  }
  // token 
  const token = jwt.sign({_id:emailCheck._id,email:emailCheck.email,username:emailCheck.username},process.env.TOKEN_SECRET_KEY,{ expiresIn: '1h' });
  const {password:pass,...info}=emailCheck._doc
  res.cookie("token",token,{
    sameSite: 'none',
    httpOnly:true,
    secure:true
   }).status(201).json(
    info
   )


};
const logoutUser  =async (req,res)=>{
  try{
   
    await res.cookie("token",{  maxAge: 0 },{
      path:"/",
      sameSite: 'none',
      httpOnly:true,
      secure:true
    }).status(200).json({
      success:true,
      message:"User Logout Successfully"
    })

}
catch(err){
    res.status(500).json(err)
}
}
// refetch

const refetchUser = (req,res)=>{
  const token = req.cookies.token;
  jwt.verify(token,process.env.TOKEN_SECRET_KEY,{},(err,data)=>{
   if(err){
     return res.status(404).json({message:err})
   }
   return res.status(200).json(data)
  })

}
export { loginUser, signupUser,logoutUser,refetchUser };