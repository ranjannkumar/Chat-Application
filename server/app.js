import express from "express";
import {connectDB}  from "./utils/features.js";
import dotenv from "dotenv";
import { errorMiddleware } from "./middlewares/error.middleware.js";
import cookieParser from "cookie-parser";
import userRoute from "./routes/user.route.js"
import chatRoute from "./routes/chat.route.js"
import { createUser } from "./seeders/user.seeder.js";


dotenv.config({
  path:"./.env",
})

const port = process.env.PORT || 3000;
connectDB();


const app = express();


//middlewares
app.use(express.json())
app.use(cookieParser())

app.use('/user',userRoute);
app.use('/chat',chatRoute);


app.get("/",(req,res)=>{
  res.send("Hello World");
});

app.use(errorMiddleware);


app.listen(port,()=>{
  console.log(`Server is running on port ${port}`);
})