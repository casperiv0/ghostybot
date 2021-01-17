import { Message } from "discord.js";
import Command from "../../structures/Command";
import Bot from "../../structures/Bot";

export default class NumberCommand extends Command {
  constructor(bot: Bot) {
    super(bot, {
      name: "randomnumber",
      description: "Returns a random 6 digit number",
      category: "games",
      aliases: ["number"],
    });
  }

  async execute(bot: Bot, message: Message) {
    const n = Math.floor(Math.random() * 1000000) + 1;

    message.channel.send(n);
  }
}
