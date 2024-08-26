import {body, check, validationResult} from "express-validator";
import { ErrorHandler } from "../utils/utility.js";

const validateHandler = (req,res,next)=>{
  const errors = validationResult(req);
  const errorMessages = errors
            .array()
            .map((error)=>error.msg)
            .join(", ");
  console.log(errorMessages);
  if(errors.isEmpty()) return next();
  else next(new ErrorHandler(errorMessages,400))
}

const registerValidator = ()=>[
  body("name","Please enter Name").notEmpty(),
  body("username","Please enter Username").notEmpty(),
  body("bio","Please enter Bio").notEmpty(),
  body("password","Please enter Password").notEmpty(),
  check("avatar","Please Upload Avatar").notEmpty(),
];

const loginValidator = ()=>[
  body("username","Please enter Username").notEmpty(),
  body("password","Please enter Password").notEmpty(),
];

const newGroupValidator = ()=>[
  body("name","Please enter Name").notEmpty(),
  body("members")
     .notEmpty()
     .withMessage("Please Enter Members")
     .isArray({min:2,max: 100})
     .withMessage("Members must be 2-100"),
];



export {
  registerValidator,
  validateHandler,
  loginValidator,
  newGroupValidator
};