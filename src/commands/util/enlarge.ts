import { Message, Util } from "discord.js";
import { parse } from "twemoji-parser";
import Command from "structures/Command";
import Bot from "structures/Bot";

export default class EnlargeCommand extends Command {
  constructor(bot: Bot) {
    super(bot, {
      name: "enlarge",
      description: "get your emoji enlarged",
      category: "util",
      requiredArgs: [{ name: "emoji" }],
    });
  }

  async execute(message: Message, args: string[]) {
    const lang = await this.bot.utils.getGuildLang(message.guild?.id);
    try {
      const [emoji] = args;

      const custom = Util.parseEmoji(emoji);

      const embed = this.bot.utils
        .baseEmbed(message)
        .setTitle(lang.UTIL.ENLARGED_EMOJI.replace("{emoji}", emoji));

      if (custom?.id) {
        embed.setImage(
          `https://cdn.discordapp.com/emojis/${custom.id}.${custom?.animated ? "gif" : "png"}`,
        );
        return message.channel.send({ embeds: [embed] });
      }

      const parsed = parse(emoji, { assetType: "png" });
      if (!parsed[0]) {
        return message.channel.send({ content: lang.UTIL.INVALID_EMOJI });
      }

      embed.setImage(parsed[0].url);
      return message.channel.send({ embeds: [embed] });
    } catch (err) {
      this.bot.utils.sendErrorLog(err, "error");
      return message.channel.send({ content: lang.GLOBAL.ERROR });
    }
  }
}
