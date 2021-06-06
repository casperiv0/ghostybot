import { Message, TextChannel } from "discord.js";
import Command from "structures/Command";
import Bot from "structures/Bot";

export default class SuggestCommand extends Command {
  constructor(bot: Bot) {
    super(bot, {
      name: "suggest",
      description: "Create a suggestion",
      category: "util",
      cooldown: 300,
      requiredArgs: [{ name: "suggestion" }],
    });
  }

  async execute(message: Message, args: string[]) {
    const lang = await this.bot.utils.getGuildLang(message.guild?.id);

    try {
      const suggestion = args.join(" ");
      const guild = await this.bot.utils.getGuildById(message.guild?.id);
      const suggestChannel = guild?.suggest_channel;

      if (!suggestChannel) {
        return message.channel.send(lang.UTIL.NO_SUGG_CHANNEL);
      }

      const embed = this.bot.utils
        .baseEmbed(message)
        .setTitle(lang.UTIL.NEW_SUGGESTION)
        .setDescription(suggestion)
        .setAuthor(lang.UTIL.CREATED_BY.replace("{member}", message.author.username));
      if (message.attachments.first()?.url) {
        embed.setImage(message.attachments.first()?.url!);
      }

      const channel = this.bot.channels.cache.get(suggestChannel);
      if (!channel) return;
      const sendMessage = await (channel as TextChannel).send(embed);

      sendMessage.react("👍");
      sendMessage.react("👎");

      return message.channel.send("Send suggestion 👍");
    } catch (err) {
      this.bot.utils.sendErrorLog(err, "error");
      return message.channel.send(lang.GLOBAL.ERROR);
    }
  }
}
