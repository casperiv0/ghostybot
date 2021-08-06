import { Message } from "discord.js";
import { ApiPasteFormat } from "pastebin-api";
import { Command } from "structures/Command";
import { Bot } from "structures/Bot";

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

  async execute(message: Message, args: string[]) {
    const lang = await this.bot.utils.getGuildLang(message.guild?.id);
    const [extension, ...rest] = args;
    const code = rest.join(" ");

    try {
      const paste = await this.bot.pasteClient.createPaste({
        code,
        format: extension as ApiPasteFormat,
        expireDate: "N",
        publicity: 1,
      });

      if (paste.startsWith("Bad API request, invalid api_paste_format")) {
        return message.channel.send({
          content: lang.UTIL.PASTE_INVALID_FORMAT,
        });
      }

      message.channel.send({ content: paste });
    } catch (e) {
      return message.channel.send({ content: lang.GLOBAL.ERROR });
    }
  }
}
