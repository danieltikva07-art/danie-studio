// DANIE STUDIO Discord bot. Token comes from the environment, never from this file.
// Run: node --env-file=.env index.js   (Node 20.6+)
const { Client, GatewayIntentBits, REST, Routes, SlashCommandBuilder,
  ActionRowBuilder, ButtonBuilder, ButtonStyle } = require('discord.js');

const { DISCORD_TOKEN, CLIENT_ID, GUILD_ID, SITE_URL } = process.env;
for (const [k, v] of Object.entries({ DISCORD_TOKEN, CLIENT_ID, GUILD_ID, SITE_URL })) {
  if (!v) { console.error('Missing env var: ' + k); process.exit(1); }
}

const commands = [
  new SlashCommandBuilder().setName('studio').setDescription('קישור לאתר DANIE STUDIO (לחברי השרת)'),
  new SlashCommandBuilder().setName('ping').setDescription('בדיקה שהבוט פעיל')
].map(c => c.toJSON());

const client = new Client({ intents: [GatewayIntentBits.Guilds] });

client.once('ready', async () => {
  try {
    await new REST({ version: '10' }).setToken(DISCORD_TOKEN)
      .put(Routes.applicationGuildCommands(CLIENT_ID, GUILD_ID), { body: commands });
    console.log('Logged in as ' + client.user.tag + ' - commands registered');
  } catch (e) { console.error('Command registration failed:', e.message); }
});

client.on('interactionCreate', async i => {
  if (!i.isChatInputCommand()) return;
  if (i.commandName === 'ping') return i.reply({ content: 'pong', ephemeral: true });
  if (i.commandName === 'studio') {
    const row = new ActionRowBuilder().addComponents(
      new ButtonBuilder().setLabel('פתח את DANIE STUDIO').setStyle(ButtonStyle.Link).setURL(SITE_URL));
    return i.reply({ content: 'הכניסה לאתר דורשת התחברות עם Discord ואישור ההרשאה.', components: [row], ephemeral: true });
  }
});

client.login(DISCORD_TOKEN);
