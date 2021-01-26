import { Message } from "discord.js";
import Command from "../../structures/Command";
import Bot from "../../structures/Bot";

export default class AddCmdCommand extends Command {
  constructor(bot: Bot) {
    super(bot, {
      name: "addcmd",
      usage: "<cmd_name> <cmd_response>",
      description: "add guild custom commands",
      category: "admin",
      memberPermissions: ["ADMINISTRATOR"],
      requiredArgs: [{ name: "command name" }, { name: "command response" }],
    });
  }

  async execute(bot: Bot, message: Message, args: string[]) {
    const lang = await bot.utils.getGuildLang(message.guild?.id);

    try {
      const [cmdName, ...rest] = args;
      const cmdResponse = rest.join(" ");
  
      const guild = await bot.utils.getGuildById(message.guild?.id);
      const commands = guild?.custom_commands;
  
      if (commands && commands.find((x) => x.name === cmdName.toLowerCase())) {
        return message.channel.send(lang.ADMIN.ADD_CMD_ALREADY_EXISTS);
      }
  
      if (bot.commands.has(cmdName)) {
        return message.channel.send(lang.ADMIN.ADD_CMD_USED_BY_BOT);
      }
  
      const data = {
        name: cmdName.toLowerCase(),
        response: cmdResponse,
      };
  
      if (!commands) {
        await bot.utils.updateGuildById(message.guild?.id, { custom_commands: [data] });
      } else {
        await bot.utils.updateGuildById(message.guild?.id, {
          custom_commands: [...commands, data],
        });
      }
  
      return message.channel.send(lang.ADMIN.ADD_CMD_ADDED.replace("{name}", cmdName.toLowerCase()));
    } catch (err) {
      bot.utils.sendErrorLog(err, "error");
      return message.channel.send(lang.GLOBAL.ERROR);
    }
  }
}
