import { ClientOptions, Constants, Intents } from "discord.js";

export const discordConfig: ClientOptions = {
  intents: [
    Intents.FLAGS.GUILDS,
    Intents.FLAGS.GUILD_MESSAGES,
    Intents.FLAGS.GUILD_BANS,
    Intents.FLAGS.GUILD_EMOJIS,
    Intents.FLAGS.GUILD_INTEGRATIONS,
    Intents.FLAGS.GUILD_INVITES,
    Intents.FLAGS.GUILD_MEMBERS,
    Intents.FLAGS.GUILD_MESSAGE_REACTIONS,
    Intents.FLAGS.GUILD_MESSAGE_TYPING,
    Intents.FLAGS.GUILD_VOICE_STATES,
    Intents.FLAGS.GUILD_WEBHOOKS,
  ],
  partials: [
    Constants.PartialTypes.GUILD_MEMBER,
    Constants.PartialTypes.MESSAGE,
    Constants.PartialTypes.USER,
    Constants.PartialTypes.REACTION,
    Constants.PartialTypes.CHANNEL,
  ],
  restRequestTimeout: 25000,
  allowedMentions: { parse: ["roles", "users"] },

  // 5 minutes
  messageSweepInterval: 60 * 5,
  messageCacheLifetime: 60 * 5,
};
