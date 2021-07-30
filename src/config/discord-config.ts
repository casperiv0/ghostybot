import * as DJS from "discord.js";

export const discordConfig: DJS.ClientOptions = {
  intents: [
    DJS.Intents.FLAGS.GUILDS,
    DJS.Intents.FLAGS.GUILD_MESSAGES,
    DJS.Intents.FLAGS.GUILD_BANS,
    DJS.Intents.FLAGS.GUILD_EMOJIS_AND_STICKERS,
    DJS.Intents.FLAGS.GUILD_INTEGRATIONS,
    DJS.Intents.FLAGS.GUILD_MEMBERS,
    DJS.Intents.FLAGS.GUILD_MESSAGE_REACTIONS,
    DJS.Intents.FLAGS.GUILD_VOICE_STATES,
    DJS.Intents.FLAGS.GUILD_INTEGRATIONS,
  ],
  partials: [
    DJS.Constants.PartialTypes.GUILD_MEMBER,
    DJS.Constants.PartialTypes.MESSAGE,
    DJS.Constants.PartialTypes.USER,
    DJS.Constants.PartialTypes.REACTION,
    DJS.Constants.PartialTypes.CHANNEL,
  ],
  restRequestTimeout: 25000,
  allowedMentions: { parse: ["roles", "users"] },

  // 5 minutes
  messageSweepInterval: 60 * 5,
  messageCacheLifetime: 60 * 5,
};
