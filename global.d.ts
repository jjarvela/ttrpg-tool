type ServerAuth = {
  id: number;
  server_id: string;
  member_id: string;
  role: string;
  nickname: string | null;
  icon: string | null;
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
