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
import { NEW_MESSAGE } from "./constants/events.constant.js";

dotenv.config({
  path:"./.env",
})

const port = process.env.PORT || 3000;
 const envMode = process.env.NODE_ENV.trim() || "PRODUCTION";

 const adminSecretKey = process.env.ADMIN_SECRET_KEY || "agsdgsjdhg";

connectDB();


const app = express();
const server = createServer(app);
const io = new Server(server,{});


//middlewares
app.use(express.json())
app.use(cookieParser())

app.use('/user',userRoute);
app.use('/chat',chatRoute);
app.use('/admin',adminRoute);



app.get("/",(req,res)=>{
  res.send("Hello World");
});

io.on("connection",(socket)=>{

  const user ={
    _id: "adgshd",
    name: "Namdjhi",
  }
  console.log("a user connected",socket.id);

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
    console.log("New Message",messageForRealTime);
    
  })

  socket.on("disconnect",()=>{
    console.log("user disconnected");
  });
})

app.use(errorMiddleware);


server.listen(port,()=>{
  console.log(`Server is running on port ${port} in ${envMode} Mode`);
})

export{
  envMode,
  adminSecretKey,
}