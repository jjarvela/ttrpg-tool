import { getConversationByUid } from "../prisma/services/conversationService";
import { prismaMock } from "../singleton";

const conversationdata = {
  uid: "12345gjdskri6789",
  channel_id: null,
  created_at: new Date("2024-05-22 11:50:54.154"),
};

test("should return conversation", async () => {
  const data = {
    uid: "12345gjdskri6789",
    messages: false,
    channel: false,
  };

  prismaMock.conversation.findUnique.mockResolvedValue({
    uid: "12345gjdskri6789",
    channel_id: null,
    created_at: new Date("2024-05-22 11:50:54.154"),
  });

  const conv = await getConversationByUid(
    "clwhrj9in00001ai2fe6z1vs9",
    false,
    false,
  );
  //console.log(conv);

  // await expect(
  //   getConversationByUid(data.uid, data.messages, data.channel)
  // )
  console.log("data " + data.uid);
  const getconv = await getConversationByUid(
    data.uid,
    data.messages,
    data.channel,
  );
  console.log(getconv);
  expect(getconv).toEqual({
    uid: "12345gjdskri6789",
    channel_id: null,
    created_at: new Date("2024-05-22 11:50:54.154"),
  });
});
