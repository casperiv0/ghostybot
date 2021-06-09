import { Guild, Message } from "discord.js";
import Command from "structures/Command";
import Bot from "structures/Bot";

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
        return message.channel.send("Emoji can only be a custom emoji or the emoji was not found");
      }

      let emojiAuthor: string | null = null;

      try {
        emojiAuthor = await foundEmoji.fetchAuthor().then((v) => v.tag);
      } catch {
        emojiAuthor = "Invalid Permissions";
      }

      const { date: createdAt, tz } = await this.bot.utils.formatDate(
        foundEmoji.createdAt,
        message.guild?.id,
      );

      const embed = this.bot.utils
        .baseEmbed(message)
        .setTitle(`Emoji info: ${foundEmoji}`)
        .setThumbnail(foundEmoji.url).setDescription(`
**Name:** ${foundEmoji.name}
**ID:** ${foundEmoji.id}
**Created At:** ${createdAt} (${tz})
**Created by:** ${emojiAuthor}
**Accessible By:** ${
        foundEmoji.roles.cache.map((r) => r.name).join(", ") || lang.GLOBAL.EVERYONE
      }`);

      return message.channel.send({ embed });
    } catch (err) {
      this.bot.utils.sendErrorLog(err, "error");
      return message.channel.send(lang.GLOBAL.ERROR);
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
