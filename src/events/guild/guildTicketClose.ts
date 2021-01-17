import { GuildChannel, TextChannel, User } from "discord.js";
import Bot from "../../structures/Bot";
import Event from "../../structures/Event";

export default class GuildTicketCloseEvent extends Event {
  constructor(bot: Bot) {
    super(bot, "guildTicketClose");
  }

  async execute(bot: Bot, channel: GuildChannel, executor: User) {
    try {
      if (!channel.guild) return;
      if (!channel.guild.available) return;
      const webhook = await bot.utils.getWebhook(channel.guild);
      if (!webhook) return;
  
      const topic = (channel as TextChannel).topic
        ? `${(channel as TextChannel).topic} was closed`
        : "Ticket author could not be fetched";
  
      const embed = bot.utils
        .baseEmbed({ author: bot.user })
        .setTitle("Ticket closed")
        .setDescription(topic)
        .addField("Closed by", executor.tag, true)
        .setColor("ORANGE");
  
      return webhook.send(embed);
    } catch (err) {
      bot.utils.sendErrorLog(err, "error");
    }
  }
}
