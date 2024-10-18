import express from "express";
import {connectDB}  from "./utils/features.js";
import dotenv from "dotenv";
import { errorMiddleware } from "./middlewares/error.middleware.js";
import cookieParser from "cookie-parser";
import userRoute from "./routes/user.route.js"
import chatRoute from "./routes/chat.route.js"
import adminRoute from "./routes/admin.route.js"
import { Server } from "socket.io";
import {createServer} from "http"
import { v4 as uuid } from "uuid";
import cors from "cors";
import {v2 as cloudinary} from "cloudinary";

import { NEW_MESSAGE, NEW_MESSAGE_ALERT } from "./constants/events.constant.js";
import { getSockets } from "./lib/helper.js";
import { Message } from "./models/message.model.js";

dotenv.config({
  path:"./.env",
})

const port = process.env.PORT || 3000;
 const envMode = process.env.NODE_ENV.trim() || "PRODUCTION";

 const adminSecretKey = process.env.ADMIN_SECRET_KEY || "agsdgsjdhg";
 const userSocketIDs = new Map();

connectDB();

cloudinary.config({
  cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET,
});


const app = express();
const server = createServer(app);
const io = new Server(server,{});


//middlewares
app.use(express.json())
app.use(cookieParser())
app.use(
  cors({
    origin: [
      "http://localhost:5173", 
      "http://localhost:4173",
      process.env.CLIENT_URL,
    ],
    credentials: true,
  })
);

app.use('/api/v1/user',userRoute);
app.use('/api/v1/chat',chatRoute);
app.use('/api/v1/admin',adminRoute);



app.get("/",(req,res)=>{
  res.send("Hello World");
});

io.use((socket,next)=>{})
io.on("connection",(socket)=>{

  const user ={
    _id: "adgshd",
    name: "Namdjhi",
  }

  userSocketIDs.set(user._id.toString(),socket.id);

  console.log(userSocketIDs);

  socket.on(NEW_MESSAGE,async({chatId,members,message})=>{

    const messageForRealTime = {
      content: message,
      _id: uuid(),
      sender:{
        _id: user._id,
        name: user.name,
      },
      chat: chatId,
      createdAt: new Date().toISOString(),
    };

    const messageForDB = {
      content: message,
      sender: user._id,
      chat: chatId,
    };

    const membersSocket = getSockets(members);
    io.to(membersSocket).emit(NEW_MESSAGE,{
      chatId,
      message:messageForRealTime,
    });
    io.to(membersSocket).emit(NEW_MESSAGE_ALERT,{chatId});

    try {
    await Message.create(messageForDB);
    } catch (error) {
      console.log(error);
      
    }
  });

  socket.on("disconnect",()=>{
    console.log("user disconnected");
    userSocketIDs.delete(user._id.toString());
  });
})

app.use(errorMiddleware);


server.listen(port,()=>{
  console.log(`Server is running on port ${port} in ${envMode} Mode`);
})

export{
  envMode,
  adminSecretKey,
  userSocketIDs,
}