import { Message, Permissions } from "discord.js";
import Command from "structures/Command";
import Bot from "structures/Bot";

export default class DelCmdCommand extends Command {
  constructor(bot: Bot) {
    super(bot, {
      name: "delcmd",
      usage: "<cmd_name>",
      description: "Delete the custom commannd",
      category: "admin",
      aliases: ["removecmd"],
      memberPermissions: [Permissions.FLAGS.ADMINISTRATOR],
      requiredArgs: [{ name: "command name" }],
    });
  }

  async execute(message: Message, args: string[]) {
    const lang = await this.bot.utils.getGuildLang(message.guild?.id);
    try {
      return message.channel.send({
        content: lang.ADMIN.CMD_DEPRECATED.replace("{url}", process.env["NEXT_PUBLIC_DASHBOARD_URL"]),
      });
    } catch (err) {
      this.bot.utils.sendErrorLog(err, "error");
      return message.channel.send({ content: lang.GLOBAL.ERROR });
    }
  }
}
