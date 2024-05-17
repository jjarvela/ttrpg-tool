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
  user: {
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
