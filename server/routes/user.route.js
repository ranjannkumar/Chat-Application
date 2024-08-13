import express from "express";
import { getMyProfile, login, newUser } from "../controllers/user.controller.js";
import { singleAvatar } from "../middlewares/multer.middleware.js";
import { isAuthenticated } from "../middlewares/auth.middleware.js";

const app = express.Router();

app.post("/new",singleAvatar, newUser)
app.post("/login",login)

// after here user must be logged in to acceess the routes
app.use(isAuthenticated);
app.get("/me",getMyProfile)
export default app;