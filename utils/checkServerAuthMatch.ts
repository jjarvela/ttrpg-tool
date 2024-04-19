export default function checkAuthMatch(
  serverAuth: {
    id: number;
    server_id: string;
    member_id: string;
    role: string;
    nickname: string | null;
    icon: string | null;
  },
  config: {
    id: number;
    server_id: string;
    config_permission: string;
    protected: boolean | null;
    password_hash: string | null;
    explorable: boolean | null;
    searchable: boolean | null;
  },
) {
  const permissions = config.config_permission;
  if (permissions === "All members") return true;
  const role = serverAuth.role;
  if (permissions.toUpperCase().includes(role.toUpperCase())) return true;
  return false;
}
