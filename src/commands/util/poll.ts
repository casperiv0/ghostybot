import { Message } from "discord.js";
import { Command } from "structures/Command";
import { Bot } from "structures/Bot";

export default class PollCommand extends Command {
  constructor(bot: Bot) {
    super(bot, {
      name: "poll",
      description: "Create a poll",
      category: "util",
      requiredArgs: [{ name: "question" }],
    });
  }

  async execute(message: Message, args: string[]) {
    const lang = await this.bot.utils.getGuildLang(message.guild?.id);
    try {
      const question = args.join(" ");

      const embed = this.bot.utils
        .baseEmbed(message)
        .setAuthor(lang.UTIL.CREATED_BY.replace("{member}", message.author.tag))
        .setDescription(question);

      embed.footer = null;

      const sendMessage = await message.channel.send({ embeds: [embed] });

      sendMessage.react("👍");
      sendMessage.react("👎");
      sendMessage.react("🤷");
    } catch (err) {
      this.bot.utils.sendErrorLog(err, "error");
      return message.channel.send({ content: lang.GLOBAL.ERROR });
    }
  }
}
