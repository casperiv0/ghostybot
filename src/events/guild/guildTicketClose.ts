import * as DJS from "discord.js";
import { Bot } from "structures/Bot";
import { Event } from "structures/Event";

export default class GuildTicketCloseEvent extends Event {
  constructor(bot: Bot) {
    super(bot, "guildTicketClose");
  }

  async execute(bot: Bot, channel: DJS.GuildChannel, executor: DJS.User) {
    try {
      if (!channel.guild || !channel.guild.available) return;
      if (!channel.isTextBased()) return;

      const webhook = await bot.utils.getWebhook(channel.guild);
      if (!webhook) return;

      const topic =
        "topic" in channel && channel.topic
          ? `${channel.topic} was closed`
          : "Ticket author could not be fetched";

      const embed = bot.utils
        .baseEmbed({ author: bot.user })
        .setTitle("Ticket closed")
        .setDescription(topic)
        .setColor(DJS.Colors.Orange)
        .addFields({ name: "Closed by", value: executor.tag, inline: true });

      await webhook.send({ embeds: [embed] });
    } catch (err) {
      bot.utils.sendErrorLog(err, "error");
    }
  }
}
