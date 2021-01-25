import { Message } from "discord.js";
import Command from "../../structures/Command";
import Bot from "../../structures/Bot";

export default class BlockCommand extends Command {
  constructor(bot: Bot) {
    super(bot, {
      name: "block",
      description: "Write text with blocks",
      category: "games",
      requiredArgs: [{ name: "text" }],
    });
  }

  async execute(bot: Bot, message: Message, args: string[]) {
    const lang = await bot.utils.getGuildLang(message.guild?.id);

    try {
      const blocks = args
        .join(" ")
        .toLowerCase()
        .replace(/[a-z]/g, ":regional_indicator_$&:")
        .replace(/1/g, ":one:")
        .replace(/2/g, ":two:")
        .replace(/3/g, ":three:")
        .replace(/4/g, ":four:")
        .replace(/5/g, ":five:")
        .replace(/6/g, ":six:")
        .replace(/7/g, ":seven:")
        .replace(/8/g, ":eight:")
        .replace(/9/g, ":nine:")
        .replace(/0/g, ":zero:");

      const embed = bot.utils.baseEmbed(message).setDescription(blocks);

      message.channel.send(embed);
    } catch (err) {
      bot.utils.sendErrorLog(err, "error");
      return message.channel.send(lang.GLOBAL.ERROR);
    }
  }
}
