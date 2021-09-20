import * as DJS from "discord.js";
import { Bot } from "structures/Bot";
import { Event } from "structures/Event";

export default class GuildChannelTopicUpdateEvent extends Event {
  constructor(bot: Bot) {
    super(bot, "guildChannelTopicUpdate");
  }

  async execute(bot: Bot, channel: DJS.GuildChannel, oldTopic: string, newTopic: string) {
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
        .addField(lang.EVENTS.CHANNEL_OLD_TOPIC, oldTopic || lang.GLOBAL.NONE)
        .addField(lang.EVENTS.CHANNEL_NEW_TOPIC, newTopic || lang.GLOBAL.NONE)
        .setTimestamp();

      await webhook.send({ embeds: [embed] });
    } catch (err) {
      bot.utils.sendErrorLog(err, "error");
    }
  }
}
