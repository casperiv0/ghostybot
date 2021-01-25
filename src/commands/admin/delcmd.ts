import { Message } from "discord.js";
import Command from "../../structures/Command";
import Bot from "../../structures/Bot";

export default class DelCmdCommand extends Command {
  constructor(bot: Bot) {
    super(bot, {
      name: "delcmd",
      usage: "<cmd_name>",
      description: "Delete the custom commannd",
      category: "admin",
      aliases: ["removecmd"],
      memberPermissions: ["ADMINISTRATOR"],
      requiredArgs: [{ name: "command name" }],
    });
  }

  async execute(bot: Bot, message: Message, args: string[]) {
    const lang = await bot.utils.getGuildLang(message.guild?.id);
    try {
      const guild = await bot.utils.getGuildById(message.guild?.id);
      const commands = guild?.custom_commands;
      const [cmdName] = args;

      if (commands) {
        const data = commands.find((cmd) => cmd.name === cmdName.toLowerCase());

        if (!data) {
          return message.channel.send(lang.ADMIN.DEL_CMD_NOT_FOUND);
        }

        const filtered = commands.filter((cmd) => cmd.name !== cmdName.toLowerCase());

        await bot.utils.updateGuildById(message.guild?.id, {
          custom_commands: filtered,
        });
        return message.channel.send(lang.ADMIN.DEL_CMD_DELETED.replace("{cmd}", cmdName));
      } else {
        return message.channel.send(lang.ADMIN.DEL_CMD_NO_COMMANDS);
      }
    } catch (err) {
      bot.utils.sendErrorLog(err, "error");
      return message.channel.send(lang.GLOBAL.ERROR);
    }
  }
}
