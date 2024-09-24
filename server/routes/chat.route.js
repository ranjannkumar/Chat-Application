import express from "express";
import { isAuthenticated } from "../middlewares/auth.middleware.js";
import { addMembers, deleteChat, getChatDetails, getMessages, getMyChats, getMyGroups, leaveGroup, newGroupChat, removeMember, renameGroup, sendAttachments } from "../controllers/chat.controller.js";
import { attachmentsMulter } from "../middlewares/multer.middleware.js";
import { addMemberValidator, chatIdValidator, newGroupValidator, removeMemberValidator, renameValidator, sendAttachmentsValidator, validateHandler } from "../lib/validators.js";

const app = express.Router();



// after here user must be logged in to acceess the routes
app.use(isAuthenticated);

app.post("/new",newGroupValidator(),validateHandler, newGroupChat);
app.get("/my",getMyChats);
app.get("/my/groups",getMyGroups);
app.put("/addmembers",addMemberValidator(),validateHandler, addMembers);
app.put("/removemember",removeMemberValidator(),validateHandler, removeMember);

app.delete("/leave/:id",chatIdValidator(),validateHandler, leaveGroup);

//send attachments
app.post("/message",attachmentsMulter,sendAttachmentsValidator(),validateHandler, sendAttachments);
//get messages
app.get("/message/:id",chatIdValidator(),validateHandler, getMessages)
//get chat details,rename,delete
app
 .route("/:id")
 .get(chatIdValidator(),validateHandler,getChatDetails)
 .put(renameValidator(),validateHandler,renameGroup)
 .delete(chatIdValidator(),validateHandler,deleteChat);



export default app;