import { GuildChannel } from "discord.js";
import Bot from "../../structures/Bot";
import Event from "../../structures/Event";

export default class ChannelUpdateEvent extends Event {
  constructor(bot: Bot) {
    super(bot, "channelUpdate");
  }

  async execute(bot: Bot, oldChannel: GuildChannel, newChannel: GuildChannel) {
    try {
      if (!oldChannel.guild?.available) return;
      if (!oldChannel.guild.me?.hasPermission("MANAGE_WEBHOOKS")) return;
  
      const webhook = await bot.utils.getWebhook(newChannel.guild);
      if (!webhook) return;
      const lang = await bot.utils.getGuildLang(newChannel.guild.id);
  
      let msg = "";
      const type = newChannel.type === "category" ? "Category" : "Channel";
      if (oldChannel.name !== newChannel.name) {
        msg = lang.EVENTS.CHANNEL_RENAME_MSG.replace("{channel_type}", type)
          .replace("{channel}", oldChannel.name)
          .replace("{new_channel}", newChannel.name);
      } else {
        return;
      }
  
      const embed = bot.utils
        .baseEmbed({ author: bot.user })
        .setTitle(lang.EVENTS.CHANNEL_RENAME)
        .setDescription(msg)
        .setColor("ORANGE")
        .setTimestamp();
  
      webhook.send(embed);
    } catch (err) {
      bot.utils.sendErrorLog(err, "error");
    }
  }
}
