import { Message } from "discord.js";
import Command from "../../structures/Command";
import Bot from "../../structures/Bot";

export default class BotInviteCommand extends Command {
  constructor(bot: Bot) {
    super(bot, {
      name: "botinvite",
      description: "Returns the bot invite",
      category: "util",
      aliases: ["botinv"],
    });
  }

  async execute(bot: Bot, message: Message) {
    const botInvite = `https://discord.com/oauth2/authorize?client_id=${bot.user?.id}&scope=bot&permissions=8`;

    return message.channel.send(botInvite);
  }
}
