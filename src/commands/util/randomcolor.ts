import { Message } from "discord.js";
import Command from "../../structures/Command";
import Bot from "../../structures/Bot";

export default class RandomColorCommand extends Command {
  constructor(bot: Bot) {
    super(bot, {
      name: "randomcolor",
      description: "Get a random color",
      category: "util",
      aliases: ["color"],
    });
  }

  async execute(bot: Bot, message: Message) {
    const color = Math.floor(Math.random() * 16777215).toString(16);
    const preview = `https://api.no-api-key.com/api/v2/color?hex=${color}`;

    const embed = bot.utils
      .baseEmbed(message)
      .setThumbnail(preview)
      .setColor(`#${color}`)
      .setTitle(`#${color}`);

    message.channel.send(embed);
  }
}
