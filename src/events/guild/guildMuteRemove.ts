import { Guild } from "discord.js";
import Bot from "../../structures/Bot";
import Event from "../../structures/Event";
import { MuteData } from "./guildMuteAdd";

export default class GuildMemberRemoveEvent extends Event {
  constructor(bot: Bot) {
    super(bot, "guildMuteRemove");
  }

  async execute(bot: Bot, guild: Guild, mute: MuteData) {
    try {
      if (!guild) return;
      if (!guild.available) return;
      const webhook = await bot.utils.getWebhook(guild);
      if (!webhook) return;
  
      const { member, executor } = mute;
  
      const embed = bot.utils
        .baseEmbed({ author: executor })
        .setTitle("User unmuted")
        .addField("Tag", member.user.tag, true)
        .addField("Executed by", executor.tag, true)
        .setColor("ORANGE");
  
      return webhook.send(embed);
    } catch (err) {
      bot.utils.sendErrorLog(err, "error");
    }
  }
}
