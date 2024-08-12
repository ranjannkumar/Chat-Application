import { compare } from "bcrypt";
import {User} from "../models/user.model.js"
import { sendToken } from "../utils/features.js";
import { TryCatch } from "../middlewares/error.middleware.js";
import { ErrorHandler } from "../utils/utility.js";


const newUser = async(req,res)=>{
  const {name,username,password,bio} = req.body;
  const avatar={
    public_id: "gfsfh",
    url:"hsdg",
  };
  const user=await User.create({
    name,
    bio,
    username,
    password,
    avatar,
  });
  sendToken(res,user,201,"User created");
};

const login = TryCatch( async(req,res,next)=>{
  const {username,password} = req.body;
  const user=await User.findOne({username}).select("+password");
  if(!user)
    return next(new ErrorHandler("Invalid Username or Password",404));

  const isMatch = await compare(password,user.password);
  if(!isMatch)
    return next(new ErrorHandler("Invalid Username or Password",404));
   sendToken(res,user,200,`Welcome Back, ${user.name}`);

});

const getMyProfile = async(req,res)=>{};

export{ login,newUser,getMyProfile }