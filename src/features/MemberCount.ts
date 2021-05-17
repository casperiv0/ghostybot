import { Guild } from "discord.js";
import Bot from "structures/Bot";
import Feature from "structures/Feature";

export default class MemberCountFeature extends Feature {
  constructor(bot: Bot) {
    super(bot, "member-count");
  }

  async execute() {
    const timeout = 60 * 1000 * 15; // 15 minutes
    const updateMembers = async (guild: Guild) => {
      const g = await this.bot.utils.getGuildById(guild.id);
      if (!g) return;
      if (!this.bot.user) return;
      if (!g.member_count_channel_id || g.member_count_channel_id === "Disabled") return;

      const channel = guild.channels.cache.get(g.member_count_channel_id);

      if (!channel) return;
      if (!channel.permissionsFor(this.bot.user.id)?.has("MANAGE_CHANNELS")) return;

      channel.setName(`Members: ${guild.memberCount.toString()}`);
    };

    setInterval(() => {
      this.bot.guilds.cache.forEach((guild) => {
        updateMembers(guild);
      });
    }, timeout);
  }
}
