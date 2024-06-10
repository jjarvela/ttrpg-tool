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
    character_config: {
      create: {
        enable_creation: false,
        vitals_count: 1,
        vitals_names: ["HP"],
        attributes_count: 2,
        attributes_names: ["Strength", "Dexterity"],
        statics_count: 2,
        statics_names: ["Stealth", "Persuasion"],
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
    character_config: {
      create: {
        enable_creation: false,
        vitals_count: 1,
        vitals_names: ["HP"],
        attributes_count: 2,
        attributes_names: ["Strength", "Dexterity"],
        statics_count: 2,
        statics_names: ["Stealth", "Persuasion"],
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
