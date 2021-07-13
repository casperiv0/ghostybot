import { Message } from "discord.js";
import colorRegex from "hex-color-regex";
import Command from "structures/Command";
import Bot from "structures/Bot";

export default class RandomColorCommand extends Command {
  constructor(bot: Bot) {
    super(bot, {
      name: "randomcolor",
      description: "Get a random color",
      category: "util",
      aliases: ["color"],
    });
  }

  parseColor(v: string): `#${string}` {
    if (v) {
      return (v.startsWith("#") ? v : `#${v}`).toLowerCase() as `#${string}`;
    }

    return `#${Math.floor(Math.random() * 16777215).toString(16)}`;
  }

  async execute(message: Message, args: string[]) {
    const [providedColor] = args;
    const color = this.parseColor(providedColor);

    if (providedColor) {
      const isValid = colorRegex({ strict: true }).test(providedColor.toLowerCase());

      if (!isValid) {
        return message.channel.send({ content: "Invalid color HEX" });
      }
    }

    const preview = `https://api.no-api-key.com/api/v2/color?hex=${color.slice(1, color.length)}`;

    const embed = this.bot.utils
      .baseEmbed(message)
      .setThumbnail(preview)
      .setColor(color)
      .setTitle(color);

    message.channel.send({ embeds: [embed] });
  }
}
