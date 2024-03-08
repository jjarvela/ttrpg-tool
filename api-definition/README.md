### ttrpg-tool API documentation

#### Predicted necessary data types

- User
  id, uid, username, password_hash, email, created_at
- User_Info
  uid, username, screenName, profileImage
  where: wherever user's name and image needs to be displayed
- User_Details
  uid, timezone, timezoneSharing (boolean), status (string), socketId, about? (string)
  where: user friend list, DMs, server member info, server world clock

- Server
  id, uid, serverName, ownerUid (user uid), passwordProtected (boolean), password_hash?, created_at, enableExplore (boolean), enableSearch (boolean)
  where: creating server, user joining server
- Server_Info
  uid, serverName, serverImage
  where: user servers menu
- Server_Members
  serverUid, members (array User_info, User_Details?)
  where: server members menu
- Server_Channels
  serverUid, array (Conversations)
  where: server page
