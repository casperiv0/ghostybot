import { Message, Permissions } from "discord.js";
import Command from "../../structures/Command";
import Bot from "../../structures/Bot";

export default class GivReRollCommand extends Command {
  constructor(bot: Bot) {
    super(bot, {
      name: "givreroll",
      description: "Reroll a giveaway",
      category: "giveaway",
      memberPermissions: [Permissions.FLAGS.MANAGE_GUILD],
      aliases: ["greroll"],
      requiredArgs: [{ name: "messageId" }],
    });
  }

  async execute(message: Message, args: string[]) {
    const lang = await this.bot.utils.getGuildLang(message.guild?.id);
    try {
      const [messageId] = args;

      this.bot.giveawayManager
        .reroll(messageId)
        .catch(() => message.channel.send(`No giveaway found with id: ${messageId}`));
    } catch (err) {
      this.bot.utils.sendErrorLog(err, "error");
      return message.channel.send(lang.GLOBAL.ERROR);
    }
  }
}
