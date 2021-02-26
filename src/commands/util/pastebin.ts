import { Message } from "discord.js";
import { ApiPasteFormat } from "pastebin-api/dist/interfaces";
import Command from "../../structures/Command";
import Bot from "../../structures/Bot";

export default class PastebinCommand extends Command {
  constructor(bot: Bot) {
    super(bot, {
      name: "pastebin",
      aliases: ["paste"],
      description: "Get a link of pastebin for your text",
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
      const paste = await bot.pasteClient.createPaste({
        code,
        format: extension as ApiPasteFormat,
        expireDate: "N",
        publicity: 1,
      });

      if (paste.startsWith("Bad API request, invalid api_paste_format")) {
        return message.channel.send(
          "An invalid format was requested, valid types: https://pastebin.com/doc_api#5"
        );
      }

      message.channel.send(paste);
    } catch (e) {
      return message.channel.send(lang.GLOBAL.ERROR);
    }
  }
}
