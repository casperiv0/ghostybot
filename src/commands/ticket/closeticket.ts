import Command from "../../structures/Command";
import Bot from "../../structures/Bot";
import { Message, TextChannel, User } from "discord.js";

export default class CloseTicketCommand extends Command {
  constructor(bot: Bot) {
    super(bot, {
      name: "closeticket",
      description: "Closes the active ticket, use --force to force close issue",
      category: "ticket",
      botPermissions: ["MANAGE_CHANNELS"],
      cooldown: 10,
    });
  }

  async execute(bot: Bot, message: Message, args: string[]) {
    const channel = message.channel;
    const lang = await bot.utils.getGuildLang(message.guild?.id);
    try {
      if (!(channel as TextChannel).name.startsWith(lang.TICKET.TICKET.replace("#{Id}", ""))) {
        return message.channel.send(lang.TICKET.CANNOT_DO_ACTION);
      }

      if (args[0] && args[0].toLowerCase() === "--force") {
        await this.sendAuditLog(bot, channel as TextChannel, message.author);
        return channel.delete();
      }

      const timeout = 15000; /* 15 second timeout */
      const filter = (m: Message) => m.author.id === message.author.id;
      const collector = message.channel.createMessageCollector(filter, { time: timeout });
      let canceled = false;

      message.channel.send(lang.TICKET.CLOSING);

      collector.on("collect", (msg) => {
        if (msg.content.toLowerCase() === "cancel") {
          canceled = true;

          collector.stop();
          return message.channel.send(lang.TICKET.WILL_NOT_CLOSE);
        }
      });

      setTimeout(async () => {
        if (canceled === false) {
          await this.sendAuditLog(bot, channel as TextChannel, message.author);
          channel.delete();
        }
      }, timeout);
    } catch (err) {
      bot.utils.sendErrorLog(err, "error");
      return message.channel.send(lang.GLOBAL.ERROR);
    }
  }

  async sendAuditLog(bot: Bot, channel: TextChannel, executor: User) {
    bot.emit("guildTicketClose", channel, executor);
  }
}
