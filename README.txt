DANIE STUDIO bot

1. Developer Portal -> Bot -> Reset Token (the old one was exposed). Copy the NEW token.
2. Copy .env.example to .env and fill in the values. Never upload .env or paste the token anywhere.
3. Invite the bot: OAuth2 -> URL Generator -> scopes: bot + applications.commands -> open the URL.
4. npm install
5. npm start
Commands: /studio (button with the site link), /ping.
Note: the website login (discord-gate folder) does NOT need this bot or its token; it uses OAuth2.
Host it somewhere that stays running (VPS, Railway, etc.). Vercel does not run long-lived bots.
