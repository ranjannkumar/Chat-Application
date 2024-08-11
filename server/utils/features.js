import mongoose from "mongoose";
import { DB_NAME } from "../constants/constants.js";
import jwt from "jsonwebtoken";


const connectDB=async()=>{
  try{
    const connectionInstance=await mongoose.connect(`${process.env.MONGODB_URI}/${DB_NAME}`)
    console.log(`\n MongoDB connected !! DB HOST : ${
      connectionInstance.connection.host}`);
  }catch(error){
    console.log("MongoDB connection failed",error);
    process.exit(1)
  }
}

const cookieOptions = {
  maxAge: 15*24*60*60*1000,
  sameSite: "none",
  httpOnly: true,
  secure: true,
}

const sendToken=(res,user,code,message)=>{
  const token = jwt.sign(
    {
      _id: user._id
    },
    process.env.JWT_SECRET
  );
  return res.status(code).cookie("chattu-token",token,cookieOptions).json({
    success:true,
    message,
  })
}

export  {connectDB,sendToken};