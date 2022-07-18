import * as DJS from "discord.js";

export const discordConfig: DJS.ClientOptions = {
  intents: [
    DJS.GatewayIntentBits.Guilds,
    DJS.GatewayIntentBits.GuildMessages,
    DJS.GatewayIntentBits.GuildBans,
    DJS.GatewayIntentBits.GuildEmojisAndStickers,
    DJS.GatewayIntentBits.GuildMembers,
    DJS.GatewayIntentBits.GuildMessageReactions,
    DJS.GatewayIntentBits.GuildVoiceStates,
    DJS.GatewayIntentBits.GuildIntegrations,
  ],
  partials: [
    DJS.Partials.GuildMember,
    DJS.Partials.User,
    DJS.Partials.Reaction,
    DJS.Partials.Channel,
  ],
  rest: {
    timeout: 25_000,
  },
  allowedMentions: { parse: ["roles", "users"] },

  makeCache: DJS.Options.cacheWithLimits({
    ...DJS.Options.DefaultMakeCacheSettings,
    MessageManager: { maxSize: 2 },
    ThreadManager: { maxSize: 2 },
    ThreadMemberManager: { maxSize: 2 },
  }),
};
