export const Users = [
  // User 1
  {
    username: "Jane",
    password_hash:
      "$argon2id$v=19$m=65536,t=3,p=4$Eu+IgfkgshskDifvIMTPjA$ZyRSzV6ZJz2VnqBtOyBPa94CB+RjKhbp3RctYInQf4k", //plain text: testpassword
    email: "jane@mail.com",
    created_at: new Date("2024-01-01T10:00:00Z"),
    screen_name: "Test User ✨",
    timezone: "UTC+02:00",
    person_description: "Hi, I'm Jane. I'm a test user.",
    profile_image: "https://randomuser.me/api/portraits/women/9.jpg",
  },
  // User 2
  {
    username: "JohnDoe",
    password_hash:
      "$argon2id$v=19$m=65536,t=3,p=4$kt/IqnUxqGRWvPiZL6MzTg$cHgMGCImULKaVO73rkNKZ6wkJwhnmHr1KML/7Ka8X7c", //plain text: unknownpass
    email: "john@mail.com",
    created_at: new Date("2024-02-10T08:15:00Z"),
    screen_name: "JD",
    timezone: "UTC-05:00",
    person_description: "Hello, I'm John. Nice to meet you!",
    profile_image: "https://randomuser.me/api/portraits/men/11.jpg",
  },
  // User 3
  {
    username: "EmilySmith",
    password_hash:
      "$argon2id$v=19$m=65536,t=3,p=4$F0FczOLWXgCzvj8u/U3ahg$h0XmluadbkDMzDXnFtTLtUqHKV6W1sn7wAIzgrFtGaA", //plain text: thisisatest
    email: "emily@mail.com",
    created_at: new Date("2024-03-05T14:30:00Z"),
    screen_name: "Em",
    timezone: "UTC+08:00",
    person_description: "Hi there, I'm Emily!",
    profile_image: "https://randomuser.me/api/portraits/women/4.jpg",
  },
  // User 4
  {
    username: "DavidBrown",
    password_hash:
      "$argon2id$v=19$m=65536,t=3,p=4$ofahkmUowx87abVKMzxJAg$Sl8aLWEhFhX+bRlaqJGkjepbFwIocOXNvQ1/E+9Ys7Y", //plain text: bowieboy
    email: "david@mail.com",
    created_at: new Date("2024-04-20T12:45:00Z"),
    screen_name: "Dave",
    timezone: "UTC-07:00",
    person_description: "Hey, I'm David. Nice to meet you all!",
    profile_image: "https://randomuser.me/api/portraits/men/5.jpg",
  },
  // User 5
  {
    username: "SarahJohnson",
    password_hash:
      "$argon2id$v=19$m=65536,t=3,p=4$4RGFJalZOWa0qTTQTiFK1Q$5VuF8v5Yw+kjhq0/WgLdLfNNjJoQ4ySFWSlzmAwMpOQ", //plain text: mycoolpassword
    email: "sarah@mail.com",
    created_at: new Date("2024-05-15T17:20:00Z"),
    screen_name: "SJ",
    timezone: "UTC-03:00",
    person_description: "Hi, I'm Sarah! Excited to be here.",
    profile_image: "https://randomuser.me/api/portraits/women/2.jpg",
  },
  // User 6 (Dickerson)
  {
    username: "Dickerson",
    password_hash:
      "$argon2id$v=19$m=65536,t=3,p=4$8yXaxpx8kx7H54liF6WWrA$lasxo5/ywVflAfoDXxBfPVypisTCsAWiu/e8+Sw82WU", //plain text: teamyellow
    email: "dickerson@example.com",
    created_at: new Date("2024-06-30T09:30:00Z"),
    screen_name: "Dick",
    timezone: "UTC+01:00",
    person_description: "I'm Dick, but you can call me Big Dick 😄",
    profile_image: "https://randomuser.me/api/portraits/men/9.jpg",
  },
  // User 7
  {
    username: "GrimReaper",
    password_hash:
      "$argon2id$v=19$m=65536,t=3,p=4$/2ybtmON1sVCnn/HVVcsEw$wMmgb7SxnQl14Q8FFKBiAyv39XSJmDcpgaICoAT6axU", //plain text: rigormortis
    email: "grim@example.com",
    created_at: new Date("2025-03-15T12:00:00Z"),
    screen_name: "Grim Reaper 💀",
    timezone: "UTC-08:00",
    person_description:
      "Hello mortals, I'm Grim Reaper. Don't mind me, just here to collect some souls! 💀 Remember, life is short, but mine's eternal!",
    profile_image: "https://randomuser.me/api/portraits/men/13.jpg",
  },
];
