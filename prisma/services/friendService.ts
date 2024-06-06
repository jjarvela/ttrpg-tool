import { FriendInstance, FriendRequest } from "@prisma/client";
import { db } from "../db";

/**
 * Add two users to each others' friend lists
 * @param user_id - string
 * @param friend_user_id - string
 * @returns friend instance array with both users' instances
 */
export const addUserFriend = async (
  user_id: string,
  friend_user_id: string,
): Promise<Array<FriendInstance>> => {
  const user_1_friendList = await db.friendList.findUniqueOrThrow({
    where: { owner_id: user_id },
  });
  const user_2_friedList = await db.friendList.findUniqueOrThrow({
    where: { owner_id: friend_user_id },
  });

  const user1_instance = await db.friendInstance.create({
    data: {
      list_id: user_2_friedList.id,
      user_id: user_id,
    },
  });

  const user2_instance = await db.friendInstance.create({
    data: {
      list_id: user_1_friendList.id,
      user_id: friend_user_id,
    },
  });

  return [user1_instance, user2_instance];
};

/**
 * Remove two users from each others' friend lists
 * @param user_id - string
 * @param friend_user_id - string
 * @returns friend instance array with both users' instances
 */
export const removeUserFriend = async (
  user_id: string,
  friend_user_id: string,
): Promise<Array<FriendInstance>> => {
  const user_1_friendList = await db.friendList.findUniqueOrThrow({
    where: { owner_id: user_id },
  });
  const user_2_friedList = await db.friendList.findUniqueOrThrow({
    where: { owner_id: friend_user_id },
  });

  const user1_instance = await db.friendInstance.delete({
    where: {
      list_id_user_id: { list_id: user_2_friedList.id, user_id: user_id },
    },
  });

  const user2_instance = await db.friendInstance.delete({
    where: {
      list_id_user_id: {
        list_id: user_1_friendList.id,
        user_id: friend_user_id,
      },
    },
  });

  return [user1_instance, user2_instance];
};

/**
 * Search for user's presence on target user's friend list
 * @param user_id - string
 * @param friend_id - string
 * @returns boolean depending on whether instance was found or not
 */
export const isFriend = async (
  user_id: string,
  friend_id: string,
): Promise<boolean> => {
  const friend_instance = await db.user.findFirst({
    where: {
      AND: [
        { id: user_id },
        {
          friend_instances: {
            some: {
              list: {
                owner_id: friend_id,
              },
            },
          },
        },
      ],
    },
  });

  if (!friend_instance) {
    return false;
  }

  return true;
};

/**
 * Get user's friends
 * @param user_id - string
 * @returns array of users with username, screen_name, profile_image, person_status and socket_id
 */
export const getUserFriends = async (user_id: string): Promise<UserBasic[]> => {
  const friend_list = await db.friendList.findUniqueOrThrow({
    where: { owner_id: user_id },
    select: {
      friends: {
        select: {
          user: {
            select: {
              id: true,
              username: true,
              screen_name: true,
              profile_image: true,
              person_status: true,
              socket_id: true,
            },
          },
        },
      },
    },
  });

  return friend_list.friends.map((item) => item.user);
};

export const createFriendRequest = async (data: {
  requester_id: string;
  recipient_id: string;
}): Promise<FriendRequest> => {
  const request = await db.friendRequest.create({ data });
  return request;
};

export const getUserReceivedRequests = async (user_id: string) => {
  const requests = await db.friendRequest.findMany({
    where: { recipient_id: user_id },
    select: {
      id: true,
      recipient_id: true,
      requester_id: true,
      requester: {
        select: {
          username: true,
          screen_name: true,
          profile_image: true,
        },
      },
      recipient: {
        select: {
          username: true,
          screen_name: true,
          profile_image: true,
        },
      },
    },
  });

  return requests;
};

export const getUserPendingRequests = async (
  user_id: string,
): Promise<FriendRequest[]> => {
  const requests = await db.friendRequest.findMany({
    where: { requester_id: user_id },
    include: {
      recipient: {
        select: {
          username: true,
          screen_name: true,
          profile_image: true,
        },
      },
    },
  });

  return requests;
};

export const getRequestById = async (
  request_id: number,
): Promise<FriendRequest> => {
  const request = db.friendRequest.findUniqueOrThrow({
    where: { id: request_id },
  });

  return request;
};

export const getFriendRequestByUsers = async (
  uid1: string,
  uid2: string,
): Promise<FriendRequest | null> => {
  const existing = await db.friendRequest.findFirst({
    where: {
      OR: [
        { requester_id: uid1, recipient_id: uid2 },
        { requester_id: uid2, recipient_id: uid1 },
      ],
    },
  });

  return existing;
};

export const deleteRequest = async (
  request_id: number,
): Promise<FriendRequest> => {
  const request = db.friendRequest.delete({
    where: { id: request_id },
  });

  return request;
};
