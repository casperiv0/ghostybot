import { Message, Permissions } from "discord.js";
import Command from "structures/Command";
import Bot from "structures/Bot";

export default class PrefixCommand extends Command {
  constructor(bot: Bot) {
    super(bot, {
      name: "prefix",
      description: "Set a prefix for your server",
      category: "exempt",
      memberPermissions: [Permissions.FLAGS.MANAGE_GUILD],
    });
  }

  async execute(message: Message, args: string[]) {
    const lang = await this.bot.utils.getGuildLang(message.guild?.id);
    const [prefix] = args;
    try {
      const guild = await this.bot.utils.getGuildById(message.guild?.id);

      if (!prefix) {
        return message.channel.send({
          content: lang.ADMIN.CURRENT_PREFIX.replace("{guildPrefix}", `${guild?.prefix}`).replace(
            "{guildPrefix}",
            `${guild?.prefix}`,
          ),
        });
      }

      await this.bot.utils.updateGuildById(message.guild?.id, { prefix });

      return message.channel.send({
        content: lang.ADMIN.UPDATE_PREFIX.replace("{prefix}", prefix),
      });
    } catch (err) {
      this.bot.utils.sendErrorLog(err, "error");
      return message.channel.send({ content: lang.GLOBAL.ERROR });
    }
  }
}
