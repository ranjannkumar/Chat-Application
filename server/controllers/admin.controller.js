import { TryCatch } from "../middlewares/error.middleware.js";
import { Chat } from "../models/chat.model.js";
import { User } from "../models/user.model.js";
import { Message } from "../models/message.model.js";


const allUsers = TryCatch(async(req,res)=>{
  const users = await User.find({});

  const transformedUsers = await Promise.all(
    users.map(async({ name,username,avatar,_id})=>{
        const [groups,friends] = await Promise.all([
          Chat.countDocuments({groupChat:true,members:_id}),
          Chat.countDocuments({groupChat:false,members:_id}),
        ]);
        return {
          name,
          username,
          avatar:avatar.url,
          _id,
          groups,
          friends,
        };
      }
    )
  );

  return res.status(200).json({
    status:"success",
    users: transformedUsers,
  });

});

const allChats = TryCatch(async(req,res)=>{
  const chats = await Chat.find({})
      .populate("members","name avatar")
      .populate("creator","name avatar");

  const transformedChats = await Promise.all(
    chats.map(async({members,_id,groupChat,name,creator})=>{

      const totalMessages = await Message.countDocuments({chat:_id});
      return {
        _id,
        groupChat,
        name,
        avatar:members.slice(0,3).map((member)=>member.avatar.url),
        members: members.map(({_id,name,avatar})=>({
          _id,
          name,
          avatar: avatar.url,
        })),
        creator: {
           name: creator?.name || "None",
           avatar: creator?.avatar.url || "",
        },
        totalMembers: members.length,
        totalMessages,
      };
    })
  );    

  return res.status(200).json({
    status:"success",
    chats: transformedChats,
  });
});

export{
  allUsers,
  allChats,
}