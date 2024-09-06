import express from "express";
import { isAuthenticated } from "../middlewares/auth.middleware.js";
import { addMembers, deleteChat, getChatDetails, getMessages, getMyChats, getMyGroups, leaveGroup, newGroupChat, removeMember, renameGroup, sendAttachments } from "../controllers/chat.controller.js";
import { attachmentsMulter } from "../middlewares/multer.middleware.js";
import { addMemberValidator, newGroupValidator, removeMemberValidator, validateHandler } from "../lib/validators.js";

const app = express.Router();



// after here user must be logged in to acceess the routes
app.use(isAuthenticated);

app.post("/new",newGroupValidator(),validateHandler, newGroupChat);
app.get("/my",getMyChats);
app.get("/my/groups",getMyGroups);
app.put("/addmembers",addMemberValidator(),validateHandler, addMembers);
app.put("/removemember",removeMemberValidator(),validateHandler, removeMember);

app.delete("/leave/:id",leaveGroup);

//send attachments
app.post("/message",attachmentsMulter,sendAttachments);
//get messages
app.get("/message/:id",getMessages)
//get chat details,rename,delete
app.route("/:id").get(getChatDetails).put(renameGroup).delete(deleteChat);



export default app;