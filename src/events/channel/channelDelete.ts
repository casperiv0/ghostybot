import { GuildChannel } from "discord.js";
import Bot from "../../structures/Bot";
import Event from "../../structures/Event";

export default class ChannelDeleteEvent extends Event {
  constructor(bot: Bot) {
    super(bot, "channelDelete");
  }

  async execute(bot: Bot, channel: GuildChannel) {
    try {
      if (!channel.guild?.available) return;
      if (!channel.guild.me?.hasPermission("MANAGE_WEBHOOKS")) return;
      const webhook = await bot.utils.getWebhook(channel.guild);
      if (!webhook) return;
      const lang = await bot.utils.getGuildLang(channel.guild.id);
  
      const type = channel.type === "category" ? "Category" : "Channel";
      const msg = lang.EVENTS.CHANNEL_DELETED_MSG.replace("{channel_type}", type).replace(
        "{channel}",
        channel.name
      );
  
      const embed = bot.utils
        .baseEmbed({ author: bot?.user })
        .setTitle(lang.EVENTS.CHANNEL_DELETED)
        .setDescription(msg)
        .setColor("RED")
        .setTimestamp();
  
      webhook.send(embed);
    } catch (err) {
      bot.utils.sendErrorLog(err, "error");
    }
  }
}
