import { Message } from "discord.js";
import Command from "../../structures/Command";
import Bot from "../../structures/Bot";

export default class PollCommand extends Command {
  constructor(bot: Bot) {
    super(bot, {
      name: "poll",
      description: "Create a poll",
      category: "util",
      requiredArgs: [{ name: "question" }],
    });
  }

  async execute(bot: Bot, message: Message, args: string[]) {
    const lang = await bot.utils.getGuildLang(message.guild?.id);
    try {
      const question = args.join(" ");

      const embed = bot.utils
        .baseEmbed(message)
        .setTitle(question)
        .setDescription(lang.UTIL.CREATED_BY.replace("{member}", message.author.tag));

      const sendMessage = await message.channel.send(embed);

      sendMessage.react("👍");
      sendMessage.react("👎");
      sendMessage.react("🤷");
    } catch (err) {
      bot.utils.sendErrorLog(err, "error");
      return message.channel.send(lang.GLOBAL.ERROR);
    }
  }
}
