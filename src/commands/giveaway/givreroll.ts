import { Message } from "discord.js";
import Command from "../../structures/Command";
import Bot from "../../structures/Bot";

export default class GivReRollCommand extends Command {
  constructor(bot: Bot) {
    super(bot, {
      name: "givreroll",
      description: "Reroll a giveaway",
      category: "giveaway",
      memberPermissions: ["MANAGE_GUILD"],
      aliases: ["greroll"],
      requiredArgs: [{ name: "messageId" }],
    });
  }

  async execute(bot: Bot, message: Message, args: string[]) {
    const lang = await bot.utils.getGuildLang(message.guild?.id);
    try {
      const [messageId] = args;

      bot.giveawayManager
        .reroll(messageId)
        .catch(() => message.channel.send(`No giveaway found with id: ${messageId}`));
    } catch (err) {
      bot.utils.sendErrorLog(err, "error");
      return message.channel.send(lang.GLOBAL.ERROR);
    }
  }
}
