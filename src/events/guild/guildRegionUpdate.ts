import { Guild } from "discord.js";
import Bot from "../../structures/Bot";
import Event from "../../structures/Event";
import regions from "../../data/regions.json";

export default class GuildRegionUpdateEvent extends Event {
  constructor(bot: Bot) {
    super(bot, "guildRegionUpdate");
  }

  async execute(bot: Bot, guild: Guild, oldRegion: string, newRegion: string) {
    try {
      if (!guild) return;
      if (!guild.available) return;
      const webhook = await bot.utils.getWebhook(guild);
      if (!webhook) return;
  
      const oldR = regions[oldRegion];
      const newR = regions[newRegion];
  
      const embed = bot.utils
        .baseEmbed({ author: bot.user })
        .setTimestamp()
        .setColor("ORANGE")
        .setTitle("Guild Update: `Region Update`")
        .setDescription("Region for this guild was updated")
        .addField("Old Region", oldR)
        .addField("New Region", newR);
  
      webhook.send(embed);
    } catch (err) {
      bot.utils.sendErrorLog(err, "error");
    }
  }
}
