import { Message } from "discord.js";
import hastebin from "hastebin-gen";
import Command from "../../structures/Command";
import Bot from "../../structures/Bot";

export default class HastebinCommand extends Command {
  constructor(bot: Bot) {
    super(bot, {
      name: "hastebin",
      aliases: ["haste"],
      description: "Get a link of hastebin for your text",
      category: "util",
      usage: "<extension (js, ts, ...)> <code>",
      requiredArgs: [{ name: "extension" }, { name: "code" }],
    });
  }

  async execute(bot: Bot, message: Message, args: string[]) {
    const lang = await bot.utils.getGuildLang(message.guild?.id);
    const [extension, ...rest] = args;
    const code = rest.join(" ");

    if (!extension) {
      return message.channel.send(lang.UTIL.PROVIDE_EXT);
    }

    if (!code) {
      return message.channel.send(lang.UTIL.PROVIDE_CODE);
    }

    try {
      const haste = await hastebin(`${code}`, { extension: `${extension}` });

      message.channel.send(haste);
    } catch (e) {
      return message.channel.send(lang.GLOBAL.ERROR);
    }
  }
}
