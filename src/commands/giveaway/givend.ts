import { Message, Permissions } from "discord.js";
import Command from "../../structures/Command";
import Bot from "../../structures/Bot";

export default class GiveEndCommand extends Command {
  constructor(bot: Bot) {
    super(bot, {
      name: "givend",
      description: "Ends a giveaway",
      category: "giveaway",
      usage: "givend <messageId> \n **Example:** !giveaway end <messageId>",
      memberPermissions: [Permissions.FLAGS.MANAGE_GUILD],
      aliases: ["gend"],
      requiredArgs: [{ name: "messageId" }],
    });
  }

  async execute(message: Message, args: string[]) {
    const lang = await this.bot.utils.getGuildLang(message.guild?.id);
    try {
      const [messageId] = args;

      this.bot.giveawayManager
        .delete(messageId)
        .then(() => message.channel.send("Successfully ended giveaway"))
        .catch(() => message.channel.send("Giveaway not ended yet or was not found"));
    } catch (err) {
      this.bot.utils.sendErrorLog(err, "error");
      return message.channel.send(lang.GLOBAL.ERROR);
    }
  }
}
