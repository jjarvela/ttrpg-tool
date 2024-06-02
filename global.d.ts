import { MouseEventHandler, Reference } from "react";

type ServerAuth = {
  id: number;
  server_id: string;
  member_id: string;
  role: string;
  nickname: string | null;
  icon: string | null;
};

type ServerData = {
  id: string;
  socket_id: string | null;
  server_name: string;
  image: string | null;
  jamboard: string | null;
  gameboard: string | null;
  created_at: Date;
  description: string | null;
  config?: ServerConfig[];
  server_members?: ServerMember[];
  invitations?: Invitation[];
};

type ServerConfig = {
  id: number;
  server_id: string;
  config_permission: string;
  protected: boolean | null;
  password_hash: string | null;
  explorable: boolean | null;
  searchable: boolean | null;
  join_permission: string | null;
};

type ServerMember = {
  id: number;
  server_id: string;
  member_id: string;
  role: string;
  nickname: string | null;
  icon: string | null;
  user?: {
    username: string;
    screen_name: string | null;
    timezone: string | null;
    share_timezone: boolean | null;
    profile_image: string | null;
    person_status: string | null;
    socket_id: string | null;
  };
};

type Notif = {
  id: string;
  recipient_id: string;
  type: string;
  read_status: boolean;
  created_at: Date;
  message_id: string | null;
  conversation_id: string | null;
  channel_id: string | null;
  server_id: string | null;
};

type Invitation = {
  id: string;
  server_id: string;
  expires: string;
  used_count: number;
  max_uses: number | null;
  protected: boolean;
};

type CharacterConfig = {
  id: number;
  server_id: string;
  enable_creation: boolean;
  vitals_count: number;
  vitals_names: string[];
  attributes_count: number;
  attributes_names: string[];
  statics_count: number;
  statics_names: string[];
};

type CharacterBase = {
  id: string;
  owner_id: string;
  name: string;
  description: string | null;
  image: string | null;
  notes: string | null;
};

type ServerCharacter = {
  base: CharacterBase;
  id: string;
  base_id: string;
  server_id: string;
  class: string;
  level: number;
  experience: number;
  experience_max: number;
  vitals: number[];
  vitals_max: number[];
  attributes: number[];
  statics: number[];
  skills: string;
  items: string;
};

type diceObject = {
  diceType: "d4" | "d6" | "d8" | "d10" | "d12" | "d20",
  eventHandler: Function
}

type diceSet = {
  members: diceObject[]
}

/**
 * SELECT TYPES
 */

type UserSelect = {
  id?: boolean;
  username?: boolean;
  password_hash?: boolean;
  email?: boolean;
  emailVerified?: boolean;
  created_at?: boolean;
  screen_name?: boolean;
  socket_id?: boolean;
  timezone?: boolean;
  share_timezone?: boolean;
  person_description?: boolean;
  profile_image?: boolean;
  person_status?: boolean;
};

type ServerDataSelect = {
  id?: boolean;
  socket_id?: boolean;
  server_name?: boolean;
  image?: boolean;
  jamboard?: boolean;
  gameboard?: boolean;
  created_at?: boolean;
  description?: boolean;
};

type ServerConfigSelect = {
  id: boolean;
  server_id: boolean;
  config_permission: boolean;
  protected: boolean;
  password_hash: boolean;
  explorable: boolean;
  searchable: boolean;
  join_permission: boolean;
};

type ServerMemberSelect = {
  id?: boolean;
  server_id?: boolean;
  member_id?: boolean;
  role?: boolean;
  nickname?: boolean;
  icon?: boolean;
  user?: UserSelect;
};

type CharacterBaseSelect = {
  id?: boolean;
  owner_id?: boolean;
  name?: boolean;
  description?: boolean;
  image?: boolean;
  notes?: boolean;
};

type ServerCharacterSelect = {
  id?: boolean;
  base_id?: boolean;
  server_id?: boolean;
  class?: boolean;
  level?: boolean;
  experience?: boolean;
  experience_max?: boolean;
  vitals?: boolean;
  vitals_max?: boolean;
  attributes?: boolean;
  statics?: boolean;
  skills?: boolean;
  items?: boolean;
};

