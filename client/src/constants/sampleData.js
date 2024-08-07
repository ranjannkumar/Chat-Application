 export const sampleChats= [
    {
      avatar: ["https://www.w3schools.com/howto/img_avatar.png"],
      name: "Virat Kohli",
      _id: "1",
      groupChat: false,
      members:["1","2"],
    },

    {
      avatar: ["https://www.w3schools.com/howto/img_avatar.png"],
      name: "Ranjan Shah",
      _id: "2",
      groupChat: true,
      members:["1","2"],
    },
  ]

  export const sampleUsers= [
    {
      avatar: "https://www.w3schools.com/howto/img_avatar.png",
      name: "Virat Kohli",
      _id: "1",
    },
    {
      avatar: "https://www.w3schools.com/howto/img_avatar.png",
      name: "Ranjan Shah",
      _id: "2",
    },
  ]


  export const sampleNotifications= [
    {
      sender:{
        avatar: "https://www.w3schools.com/howto/img_avatar.png",
        name: "Virat Kohli",
      },
      _id: "1",
    },
    {
       sender:{
        avatar: "https://www.w3schools.com/howto/img_avatar.png",
        name: "Ranjan Shah",
       },
      _id: "2",
    },
  ];

  export const sampleMessage =[
    {
      attachments:[],
      content: "coming there?",
      _id: "shgjhshgujhghbdaa",
      sender: {
        _id: "sdfsdsfds",
        name: "Ranjan ",
      },
      chat: "chatId",
      createdAt:"2024-07-26T09:50:00.000Z",
    },

    {
      attachments:[
        {
          public_id: "asdsad 2",
          url: "https://www.w3schools.com/howto/img_avatar.png",
        },
      ],
      content: "okk ,come fast🥰🤗",
      _id: "shgjhshgujhghbdaamansi",
      sender: {
        _id: "user._id",
        name: "Mansi ",
      },
      chat: "chatId",
      createdAt:"2024-07-26T09:50:00.000Z",
    },
  ];

  export const dashboardData={
    users:[
      {
        name: "Virat Kohli",
        avatar: ["https://www.w3schools.com/howto/img_avatar.png"],
        _id: "1",
        username: "virat_kohli",
        friends: 20,
        groups: 5,
      },
      {
        name: "Ranjan Shah",
        avatar: ["https://www.w3schools.com/howto/img_avatar.png"],
        _id: "2",
        username: "ranjan_shah",
        friends: 20,
        groups: 5,
      },
    ],

    chats: [
      {
        name: "chad coders",
        avatar: ["https://www.w3schools.com/howto/img_avatar.png"],
        _id: "1",
        groupChat: false,
        members:[
          {
            _id:"1",
            avatar: "https://www.w3schools.com/howto/img_avatar.png",
          },
          {
            _id:"2",
            avatar: "https://www.w3schools.com/howto/img_avatar.png",
          },
        ],
        totalMembers:2,
        totalMessages:20,
        creator: {
          name:"Virat Kohli",
          avatar: "https://www.w3schools.com/howto/img_avatar.png",
        },
      },

      {
        name: "knock knock",
        avatar: ["https://www.w3schools.com/howto/img_avatar.png"],
        _id: "2",
        groupChat: true,
        members:[
          {
            _id:"1",
            avatar: "https://www.w3schools.com/howto/img_avatar.png",
          },
          {
            _id:"2",
            avatar: "https://www.w3schools.com/howto/img_avatar.png",
          },
        ],
        totalMembers:2,
        totalMessages:20,
        creator: {
          name:"Ranjan Shah",
          avatar: "https://www.w3schools.com/howto/img_avatar.png",
        },
      },
    ],

    messages:[
      {
        attachments:[],
        content:"Hello,how r u?",
        _id: "shgskhghsdgk",
        sender:{
          avatar: "https://www.w3schools.com/howto/img_avatar.png",
          name:" Ranjan ",
        },
        chat: "chatId",
        groupChat:false,
        createdAt:"2024-08-07T12:34:56.789Z",
      },

      {
        attachments:[
          {
            public_id: "Ranjan 2",
            url: "https://www.w3schools.com/howto/img_avatar.png",

          }
        ],
        content:"Hii,I m good.what abt u ?",
        _id: "shgskhghsdgkmk",
        sender:{
          avatar: "https://www.w3schools.com/howto/img_avatar.png",
          name:" Ranjan 2 ",
        },
        chat: "chatId",
        groupChat:true,
        createdAt:"2024-08-07T12:34:56.789Z",
      },
    ],
  }

