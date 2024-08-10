import {User} from "../models/user.model.js"

const newUser = async(req,res)=>{
  const avatar={
    public_id: "gfsfh",
    url:"hsdg",
  };

  await User.create({
    name:"Ranjan2",
    username:"Ranjan2",
    password:"Ranjan2",
    avatar
  });

  res.status(201).json({message:"User created successfully"});
};

const login = (req,res)=>{
  res.send("Hello World");
};

export{ login,newUser }