import express from "express";
import { isAuthenticated } from "../middlewares/auth.middleware.js";
import { addMembers, getMyChats, getMyGroups, leaveGroup, newGroupChat, removeMember } from "../controllers/chat.controller.js";

const app = express.Router();



// after here user must be logged in to acceess the routes
app.use(isAuthenticated);

app.post("/new",newGroupChat);
app.get("/my",getMyChats);
app.get("/my/groups",getMyGroups);
app.put("/addmembers",addMembers);
app.put("/removemember",removeMember);

app.delete("/leave/:id",leaveGroup);

//send attachments
//get messages
//get chat details,rename,delete



export default app;