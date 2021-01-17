import { Guild } from "discord.js";
import Bot from "../structures/Bot";
import Feature from "../structures/Feature";

export default class MemberCountFeature extends Feature {
  constructor(bot: Bot) {
    super(bot, "member-count");
  }

  async execute(bot: Bot) {
    const timeout = 60 * 1000 * 15; // 15 minutes
    async function updateMembers(guild: Guild) {
      const g = await bot.utils.getGuildById(guild.id);
      if (!g) return;
      if (!bot.user) return;
      if (!g.member_count_channel_id || g.member_count_channel_id === "Disabled") return;

      const channel = guild.channels.cache.get(g.member_count_channel_id);

      if (!channel) return;
      if (!channel.permissionsFor(bot.user.id)?.has("MANAGE_CHANNELS")) return;

      channel.setName(`Members: ${guild.memberCount.toString()}`);
    }

    setInterval(() => {
      bot.guilds.cache.forEach((guild) => {
        updateMembers(guild);
      });
    }, timeout);
  }
}
