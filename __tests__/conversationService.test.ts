import {
  getConversationByParticipants,
  getConversationByUid,
  getConversationParticipants,
  getUserConversations,
  createConversationWithMessage,
  createMessage,
  getMessages,
  createChannelConversation,
  addChannelConversationMember,
  getMessagesByChannelId,
  getConversationByChannelId,
} from "../prisma/services/conversationService";
import { prismaMock } from "../singleton";

const conversationData = {
  uid: "12345gjdskri6789",
  channel_id: null,
  created_at: new Date("2024-05-22 11:50:54.154"),
};
const data2 = {
  uid: "12345gjdskri6789",
  channel_id: null,
  created_at: new Date("2024-05-22 11:50:54.154"),
  messages: [],
  participants: [
    {
      participant: {
        id: "clwg08vaf000099",
        username: "abc",
        screen_name: null,
      },
    },
  ],
};

const messages = [
  {
    uid: "trpl5504ir",
    sender_id: "a",
    message: "Hello",
    created_at: new Date("2024-05-22T11:52:19.036"),
  },
  {
    uid: "iewl8402ol",
    sender_id: "b",
    message: "Hi",
    created_at: new Date("2024-05-22T11:58:19.036"),
  },
];

// const data3 = {
//   uid: "12345gjdskri6789",
//   channel_id: null,
//   created_at: new Date("2024-05-22 11:50:54.154"),
//   messages: [
//     {
//       uid: "clwhrj9ip0",
//       conversation_uid: "12345gjdskri6789",
//       sender_id: "clwg08vaf000099",
//       message: "ddff",
//       created_at: new Date("2024-05-22T11:50:54.154"),
//     },
//     {
//       uid: "clwhrl2zg0",
//       conversation_uid: "12345gjdskri6789",
//       sender_id: "clwg08vaf000099",
//       message: "dd",
//       created_at: new Date("2024-05-22T11:52:19.036"),
//     },
//   ],
//   channel: null,
// };

test("should return conversation uid of two participants", async () => {
  const conversationUid = { uid: conversationData.uid };

  // define the return of findFirst
  // @ts-ignore
  prismaMock.conversation.findFirst.mockResolvedValue(conversationUid);

  await expect(getConversationByParticipants("a", "b")).resolves.toEqual(
    conversationUid,
  );
});

test("should return conversation by uid", async () => {
  // define the return of findUnique

  prismaMock.conversation.findUnique.mockResolvedValue(conversationData);

  await expect(
    getConversationByUid(conversationData.uid, false, false),
  ).resolves.toEqual(conversationData);
});

test("should return participants of conversation", async () => {
  const participants = [
    {
      id: 1,
      conversation_id: conversationData.uid,
      participant_id: "a",
    },
    {
      id: 2,
      conversation_id: conversationData.uid,
      participant_id: "b",
    },
  ];

  prismaMock.conversation.findUnique.mockResolvedValue(conversationData);

  prismaMock.conversationParticipant.findMany.mockResolvedValue(participants);

  await expect(
    getConversationParticipants(conversationData.uid),
  ).resolves.toEqual(participants);
});

test("should return empty array if no conversation", async () => {
  prismaMock.conversation.findUnique.mockResolvedValue(null);

  await expect(
    getConversationParticipants(conversationData.uid),
  ).resolves.toEqual([]);
});

test("should return conversations of the user", async () => {
  const userId = "clwg08vaf000099";

  const idArray = [{ conversation_id: conversationData.uid }];

  // @ts-ignore
  prismaMock.conversationParticipant.findMany.mockResolvedValue(idArray);
  // @ts-ignore
  prismaMock.conversation.findMany.mockResolvedValue(data2);

  await expect(getUserConversations(userId)).resolves.toEqual(data2);
});

test("should create conversation with message and return one message of the conversation", async () => {
  const conversationArg = { userid1: "a", userid2: "b", message: "Hello" };

  const newConversation = {
    uid: "5678gj3uokrip8d",
    channel_id: null,
    created_at: new Date("2024-05-22T11:52:19.036"),
  };

  const messageData = {
    messages: [
      {
        uid: "trpl5504ir",
        conversation_uid: "5678gj3uokrip8d",
        sender_id: "a",
        message: "Hello",
        created_at: new Date("2024-05-22T11:52:19.036"),
      },
    ],
  };

  prismaMock.conversation.create.mockResolvedValue(newConversation);

  // @ts-ignore
  prismaMock.conversation.findUnique.mockResolvedValue(messageData);

  await expect(
    createConversationWithMessage(
      conversationArg.userid1,
      conversationArg.userid2,
      conversationArg.message,
    ),
  ).resolves.toEqual(messageData.messages[0]);
});

test("should create message of the conversation and return the result", async () => {
  const messageArg = {
    sender_id: "a",
    conversation_uid: "5678gj3uokrip8d",
    message: "Hello",
  };

  const newMessage = {
    uid: "trpl5504ir",
    conversation_uid: "5678gj3uokrip8d",
    sender_id: "a",
    message: "Hello",
    created_at: new Date("2024-05-22T11:52:19.036"),
  };

  prismaMock.message.create.mockResolvedValue(newMessage);

  await expect(
    createMessage(
      messageArg.sender_id,
      messageArg.conversation_uid,
      messageArg.message,
    ),
  ).resolves.toEqual(newMessage);
});

test("should return the messages of the conversation", async () => {
  // @ts-ignore
  prismaMock.message.findMany.mockResolvedValue(messages);

  await expect(getMessages(conversationData.uid)).resolves.toEqual(messages);
});

test("should create channel conversation with participants", async () => {
  const channelArgs = {
    channel_id: "eer7io",
    members: ["a", "b", "c"],
  };

  const conversationResult = {
    uid: "5678gj3uokrip8d",
    channel_id: "eer7io",
    created_at: new Date("2024-05-22T11:58:19.036"),
  };

  prismaMock.conversation.create.mockResolvedValue(conversationResult);

  await expect(
    createChannelConversation(channelArgs.channel_id, channelArgs.members),
  ).resolves.toEqual(conversationResult);
});

test("should create channel conversation with participants, return follows type Prisma.BatchPayload", async () => {
  const returnResult = { count: 3 };

  prismaMock.conversationParticipant.createMany.mockResolvedValue(returnResult);

  await expect(
    addChannelConversationMember(conversationData.uid, ["a", "b", "c"]),
  ).resolves.toEqual(returnResult);
});

test("should return messages of conversation by channel id", async () => {
  // @ts-ignore
  prismaMock.conversation.findFirst.mockResolvedValue({ messages: messages });

  await expect(getMessagesByChannelId("krrps8e9f7")).resolves.toEqual({
    messages: messages,
  });
});

test("should return conversation uid by channel id", async () => {
  // @ts-ignore
  prismaMock.conversation.findFirst.mockResolvedValue({
    uid: conversationData.uid,
  });

  await expect(getConversationByChannelId("krrps8e9f7")).resolves.toEqual({
    uid: conversationData.uid,
  });
});

// set up error
// mockImplementation(() => {
//   throw new Error('There was an error.')
// })
