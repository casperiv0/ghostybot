import * as DJS from "discord.js";
import Command from "structures/Command";
import Bot from "structures/Bot";

export default class AddCmdCommand extends Command {
  constructor(bot: Bot) {
    super(bot, {
      name: "addcmd",
      usage: "<cmd_name> <cmd_response>",
      description: "add guild custom commands",
      category: "admin",
      memberPermissions: [DJS.Permissions.FLAGS.ADMINISTRATOR],
      requiredArgs: [{ name: "command name" }, { name: "command response" }],
    });
  }

  async execute(message: DJS.Message, args: string[]) {
    const lang = await this.bot.utils.getGuildLang(message.guild?.id);

    try {
      return message.channel.send({
        content: lang.ADMIN.CMD_DEPRECATED.replace(
          "{url}",
          process.env["NEXT_PUBLIC_DASHBOARD_URL"]!,
        ),
      });
    } catch (err) {
      this.bot.utils.sendErrorLog(err, "error");
      return message.channel.send({ content: lang.GLOBAL.ERROR });
    }
  }
}
