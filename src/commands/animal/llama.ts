import randomGen from "image-gen-discord";
import { Message } from "discord.js";
import Command from "../../structures/Command";
import Bot from "../../structures/Bot";

export default class LlamaCommand extends Command {
  constructor(bot: Bot) {
    super(bot, {
      name: "llama",
      description: "Shows a picture of a llama",
      category: "animal",
    });
  }

  async execute(bot: Bot, message: Message) {
    randomGen.lama(message, "message");
  }
}
