import randomGen from "image-gen-discord";
import { Message } from "discord.js";
import Command from "../../structures/Command";
import Bot from "../../structures/Bot";

export default class AlpacaCommand extends Command {
  constructor(bot: Bot) {
    super(bot, {
      name: "alpaca",
      description: "Shows a picture of a alpaca",
      category: "animal",
    });
  }

  async execute(bot: Bot, message: Message) {
    randomGen.alpaca(message, "message");
  }
}
