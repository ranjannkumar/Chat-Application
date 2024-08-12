import { compare } from "bcrypt";
import {User} from "../models/user.model.js"
import { sendToken } from "../utils/features.js";
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

const login = async(req,res)=>{
  const {username,password} = req.body;
  const user=await User.findOne({username}).select("+password");
  if(!user)return res.status(400).json({message: "Invalid username"});

  const isMatch = await compare(password,user.password);
  if(!isMatch)return res.status(400).json({message: "Invalid password"});
  sendToken(res,user,200,`Welcome Back, ${user.name}`);


};

export{ login,newUser }