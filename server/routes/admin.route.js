import express from "express";
import { allChats, allMessages, allUsers, getDashboardStats } from "../controllers/admin.controller.js";


const app = express.Router();

app.get("/");

app.post("/verify");

app.get("/logout");

app.get("/users",allUsers);
app.get("/chats",allChats);
app.get("/messages",allMessages);

app.get("/stats",getDashboardStats);



export default app;