import express from "express";
import userRoute from "./routes/user.route.js"

const app = express();

//middlewares
app.use('/user',userRoute);

app.get("/",(req,res)=>{
  res.send("Hello World");
});


app.listen(3000,()=>{
  console.log("Server is running on port 3000");
})