import { adminSecretKey } from "../app.js";
import { ErrorHandler } from "../utils/utility.js";
import { TryCatch } from "./error.middleware.js";
import jwt from "jsonwebtoken";


const isAuthenticated = TryCatch((req,res,next)=>{

  const token=req.cookies["chattu-token"];

  if(!token)
    return next(new ErrorHandler("Please login to access this route",401));

  const decodedData= jwt.verify(token,process.env.JWT_SECRET);

  req.user = decodedData._id;
  next();

})

const isAdmin = (req,res,next)=>{

  const token=req.cookies["chattu-admin-token"];

  if(!token)
    return next(new ErrorHandler("Only Admin can access this route",401));

  const secretKey= jwt.verify(token,process.env.JWT_SECRET);
  const isMatched = secretKey === adminSecretKey;
  if(!isMatched) return next(new ErrorHandler("Only Admin can access this route",401));

  next();

}

export {isAuthenticated,isAdmin};