import express from "express";
import { getMyProfile, login, logout, newUser, searchUser } from "../controllers/user.controller.js";
import { singleAvatar } from "../middlewares/multer.middleware.js";
import { isAuthenticated } from "../middlewares/auth.middleware.js";

const app = express.Router();

app.post("/new",singleAvatar, newUser)
app.post("/login",login)

// after here user must be logged in to acceess the routes
app.use(isAuthenticated);
app.get("/me",getMyProfile);
app.get("/logout",logout);
app.get("/search",searchUser)

export default app;