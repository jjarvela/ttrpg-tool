export const Servers = [
  // Server 1
  {
    server_name: "Grim House",
    config: {
      create: {
        config_permission: "Admin",
        protected: false,
        explorable: true,
        searchable: true,
        join_permission: "any invitation",
      },
    },
    invitations: {
      create: {
        expires: new Date(new Date().getTime() + 1209600000).toISOString(),
        used_count: 0,
        protected: false,
      },
    },
  },
  // Server 2
  {
    server_name: "Sunny Side",
    config: {
      create: {
        config_permission: "Admin",
        protected: false,
        explorable: true,
        searchable: true,
        join_permission: "any invitation",
      },
    },
    invitations: {
      create: {
        expires: new Date(new Date().getTime() + 1209600000).toISOString(),
        used_count: 0,
        protected: false,
      },
    },
  },
];
