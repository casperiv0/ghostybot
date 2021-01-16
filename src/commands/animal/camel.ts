import randomGen from "image-gen-discord";
import { Message } from "discord.js";
import Command from "../../structures/Command";
import Bot from "../../structures/Bot";

export default class CamelCommand extends Command {
  constructor(bot: Bot) {
    super(bot, {
      name: "camel",
      description: "Shows a picture of a camel",
      category: "animal",
    });
  }

  async execute(bot: Bot, message: Message) {
    randomGen.camel(message, "message");
  }
}
