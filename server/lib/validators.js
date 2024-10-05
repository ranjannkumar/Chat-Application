import {body, check, param, validationResult} from "express-validator";
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

const addMemberValidator = ()=>[
  body("chatId","Please Enter Chat ID").notEmpty(),
  body("members")
     .notEmpty()
     .withMessage("Please Enter Members")
     .isArray({min:2,max: 97})
     .withMessage("Members must be 2-97"),
];

const removeMemberValidator = ()=>[
  body("chatId","Please Enter Chat ID").notEmpty(),
  body("userId","Please Enter User ID").notEmpty(),

];



const sendAttachmentsValidator = ()=>[
  body("chatid","Please Enter Chat ID").notEmpty(),
  check("files")
   .notEmpty()
   .withMessage("Please Upload Attachments")
   .isArray({min: 1, max: 5})
   .withMessage("Attachments must be 1-5"),
];

const chatIdValidator = ()=>[
  param("id","Please Enter Chat ID").notEmpty(),
];

const renameValidator = ()=>[
  param("id","Please Enter Chat ID").notEmpty(),
  body("name","Please Enter New Name").notEmpty(),
];

const sendRequestValidator = ()=>[
  body("userId","Please Enter User ID").notEmpty(),
];

const acceptRequestValidator = ()=>[
  body("requestId","Please Enter Request ID").notEmpty(),
  body("accept")
   .notEmpty()
   .withMessage("Please Add Accept")
   .isBoolean()
   .withMessage("Accept must be a boolean"),
];

const adminLoginValidator = ()=>[
  body("secretKey","Please Enter Secret Key").notEmpty(),
];



export {
  registerValidator,
  validateHandler,
  loginValidator,
  newGroupValidator,
  addMemberValidator,
  removeMemberValidator,
  sendAttachmentsValidator,
  chatIdValidator,
  renameValidator,
  sendRequestValidator,
  acceptRequestValidator,
  adminLoginValidator,
};