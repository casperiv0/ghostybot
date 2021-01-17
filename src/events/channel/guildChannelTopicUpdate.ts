import { GuildChannel } from "discord.js";
import Bot from "../../structures/Bot";
import Event from "../../structures/Event";

export default class GuildChannelTopicUpdateEvent extends Event {
  constructor(bot: Bot) {
    super(bot, "guildChannelTopicUpdate");
  }

  async execute(bot: Bot, channel: GuildChannel, oldTopic: string, newTopic: string) {
    try {
      if (!channel.guild.available) return;
      const webhook = await bot.utils.getWebhook(channel.guild);
      if (!webhook) return;
      const lang = await bot.utils.getGuildLang(channel.guild.id);
  
      const embed = bot.utils
        .baseEmbed({ author: bot.user })
        .setTitle(lang.EVENTS.CHANNEL_TOPIC_UPDATED)
        .setDescription(lang.EVENTS.CHANNEL_TOPIC_UPDATED_MSG.replace("{channel}", channel.name))
        .setColor("ORANGE")
        .addField(lang.EVENTS.CHANNEL_OLD_TOPIC, oldTopic)
        .addField(lang.EVENTS.CHANNEL_NEW_TOPIC, newTopic)
        .setTimestamp();
  
      webhook.send(embed);
    } catch (err) {
      bot.utils.sendErrorLog(err, "error");
    }
  }
}
