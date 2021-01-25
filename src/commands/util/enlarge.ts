import { Message, Util } from "discord.js";
import { parse } from "twemoji-parser";
import Command from "../../structures/Command";
import Bot from "../../structures/Bot";

export default class EnlargeCommand extends Command {
  constructor(bot: Bot) {
    super(bot, {
      name: "enlarge",
      description: "get your emoji enlarged",
      category: "util",
      requiredArgs: [{ name: "emoji" }],
    });
  }

  async execute(bot: Bot, message: Message, args: string[]) {
    const lang = await bot.utils.getGuildLang(message.guild?.id);
    try {
      const emoji = args[0];
      if (!emoji) {
        return message.channel.send(lang.UTIL.PROVIDE_EMOJI);
      }

      const custom = Util.parseEmoji(emoji);

      const embed = bot.utils
        .baseEmbed(message)
        .setTitle(lang.UTIL.ENLARGED_EMOJI.replace("{emoji}", emoji));

      if (custom?.id) {
        embed.setImage(
          `https://cdn.discordapp.com/emojis/${custom.id}.${custom?.animated ? "gif" : "png"}`
        );
        return message.channel.send(embed);
      } else {
        const parsed = parse(emoji, { assetType: "png" });
        if (!parsed[0]) {
          return message.channel.send(lang.UTIL.INVALID_EMOJI);
        }

        embed.setImage(parsed[0].url);
        return message.channel.send(embed);
      }
    } catch (err) {
      bot.utils.sendErrorLog(err, "error");
      return message.channel.send(lang.GLOBAL.ERROR);
    }
  }
}
