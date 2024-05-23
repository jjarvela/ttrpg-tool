export default function checkAuthMatch(
  serverAuth: ServerAuth,
  config: ServerConfig,
): boolean {
  const permissions = config.config_permission;

  if (permissions === "All members") {
    return true;
  }

  const role = serverAuth.role;

  if (permissions.toUpperCase().includes(role.toUpperCase())) {
    return true;
  }

  return false;
}
