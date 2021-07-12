import { Guild, Message } from "discord.js";
import Command from "structures/Command";
import Bot from "structures/Bot";
import { time } from "@discordjs/builders";

export default class EmojiInfoCommand extends Command {
  constructor(bot: Bot) {
    super(bot, {
      name: "emojiinfo",
      description: "Returns information about a custom emoji",
      category: "util",
      requiredArgs: [{ name: "emoji" }],
      aliases: ["emoji"],
    });
  }

  async execute(message: Message, args: string[]) {
    const lang = await this.bot.utils.getGuildLang(message.guild?.id);

    try {
      const [emoji] = args;
      const foundEmoji = this.findEmoji(message.guild!, emoji);

      if (!foundEmoji) {
        return message.channel.send({
          content: "Emoji can only be a custom emoji or the emoji was not found",
        });
      }

      let emojiAuthor: string | null = null;

      try {
        emojiAuthor = await foundEmoji.fetchAuthor().then((v) => v.tag);
      } catch {
        emojiAuthor = "Invalid Permissions";
      }

      const accessibleBy =
        foundEmoji.roles.cache.map((r) => r.name).join(", ") || lang.GLOBAL.EVERYONE;

      const embed = this.bot.utils
        .baseEmbed(message)
        .setTitle(`Emoji info: ${foundEmoji}`)
        .setThumbnail(foundEmoji.url).setDescription(`
**Name:** ${foundEmoji.name}
**ID:** ${foundEmoji.id}
**Created At:** ${time(new Date(foundEmoji.createdAt), "F")}
**Created by:** ${emojiAuthor}
**Accessible By:** ${accessibleBy}`);

      return message.channel.send({ embeds: [embed] });
    } catch (err) {
      this.bot.utils.sendErrorLog(err, "error");
      return message.channel.send({ content: lang.GLOBAL.ERROR });
    }
  }

  findEmoji(guild: Guild, arg: string) {
    const regex = arg.replace(/^<a?:\w+:(\d+)>$/, "$1");
    return (
      guild.emojis.cache.find((emoji) => emoji.name === arg) ||
      guild.emojis.cache.find((emoji) => emoji.id === regex)
    );
  }
}
