import { getConversationByUid } from "../prisma/services/conversationService";
import { prismaMock } from "../singleton";

test("should return conversation by uid", async () => {
  // Data that we want to have as our output in the mocked findUnique request
  const data = {
    uid: "12345gjdskri6789",
    channel_id: null,
    created_at: new Date("2024-05-22 11:50:54.154"),
  };
  const data2 = {
    uid: "12345gjdskri6789",
    channel_id: null,
    created_at: new Date("2024-05-22 11:50:54.154"),
    messages: [
      {
        uid: "clwhrj9ip0",
        conversation_uid: "12345gjdskri6789",
        sender_id: "clwg08vaf000099",
        message: "ddff",
        created_at: new Date("2024-05-22T11:50:54.154"),
      },
      {
        uid: "clwhrl2zg0",
        conversation_uid: "12345gjdskri6789",
        sender_id: "clwg08vaf000099",
        message: "dd",
        created_at: new Date("2024-05-22T11:52:19.036"),
      },
    ],
    channel: null,
  };

  // From this point onward, all findUniques return whatever we define in mockResolvedValue()

  prismaMock.conversation.findUnique.mockResolvedValue(data2);

  expect(getConversationByUid(data2.uid, false, false)).resolves.toEqual(data2);
});
