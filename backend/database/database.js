import mongoose, { connect } from "mongoose";
import dotenv from "dotenv";
dotenv.config()
const URL = process.env.DB_URL
const Connection =()=>{
      try {
        const connect = mongoose.connect(URL);
        console.log("database connected  ");
      } catch (error) {
         console.log(error);
      }
}
export default Connection