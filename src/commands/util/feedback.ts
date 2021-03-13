import { Message, TextChannel } from "discord.js";
import Command from "../../structures/Command";
import Bot from "../../structures/Bot";

export default class FeedbackCommand extends Command {
  constructor(bot: Bot) {
    super(bot, {
      name: "feedback",
      description: "Give feedback about the bot",
      category: "util",
      requiredArgs: [{ name: "message" }],
    });
  }

  async execute(bot: Bot, message: Message, args: string[]) {
    const lang = await bot.utils.getGuildLang(message.guild?.id);
    try {
      const feedback = args.join(" ");

      if (!feedback) return message.channel.send(lang.GLOBAL.PROVIDE_ARGS);
      if (!process.env["FEEDBACK_CHANNEL_ID"] || process.env["FEEDBACK_CHANNEL_ID"] === "") return;

      const embed = bot.utils
        .baseEmbed(message)
        .setTitle(lang.UTIL.NEW_FEEDBACK)
        .setDescription(feedback);

      (bot.channels.cache.get(process.env["FEEDBACK_CHANNEL_ID"]) as TextChannel)?.send(embed);

      message.channel.send(lang.UTIL.FEEDBACK_SEND);
    } catch (err) {
      bot.utils.sendErrorLog(err, "error");
      return message.channel.send(lang.GLOBAL.ERROR);
    }
  }
}
