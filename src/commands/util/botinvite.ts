import { Message } from "discord.js";
import { Command } from "structures/Command";
import { Bot } from "structures/Bot";

export default class BotInviteCommand extends Command {
  constructor(bot: Bot) {
    super(bot, {
      name: "botinvite",
      description: "Returns the bot invite",
      category: "util",
      aliases: ["botinv"],
    });
  }

  async execute(message: Message) {
    const invite = this.bot.generateInvite({
      scopes: ["bot", "applications.commands"],
      permissions: `${8}`,
    });

    return message.channel.send({ content: invite });
  }
}
