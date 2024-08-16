import express from "express";
import { isAuthenticated } from "../middlewares/auth.middleware.js";
import { newGroupChat } from "../controllers/chat.controller.js";

const app = express.Router();



// after here user must be logged in to acceess the routes
app.use(isAuthenticated);

app.post("/new",newGroupChat);


export default app;