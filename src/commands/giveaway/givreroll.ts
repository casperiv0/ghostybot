import { Message, Permissions, Snowflake } from "discord.js";
import Command from "structures/Command";
import Bot from "structures/Bot";

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

      const success = await this.bot.giveawayManager
        .reroll(messageId as Snowflake)
        .catch(() => null);

      if (success === null) {
        return message.channel.send({ content: `No giveaway found with id: ${messageId}` });
      }

      return message.react("👍");
    } catch (err) {
      this.bot.utils.sendErrorLog(err, "error");
      return message.channel.send({ content: lang.GLOBAL.ERROR });
    }
  }
}
