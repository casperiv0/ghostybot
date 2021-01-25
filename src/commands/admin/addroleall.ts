import { Message } from "discord.js";
import Command from "../../structures/Command";
import Bot from "../../structures/Bot";

export default class AddRoleAllCommand extends Command {
  constructor(bot: Bot) {
    super(bot, {
      name: "addroleall",
      aliases: ["arall", "aroleall", "giveroleall"],
      description: "Add a role to all user of the current server",
      usage: "<role>",
      category: "admin",
      memberPermissions: ["MANAGE_ROLES", "ADMINISTRATOR"],
      botPermissions: ["MANAGE_ROLES"],
      requiredArgs: [{ name: "role" }],
    });
  }

  async execute(bot: Bot, message: Message, args: string[]) {
    const lang = await bot.utils.getGuildLang(message.guild?.id);
    try {
      const role = await bot.utils.findRole(message, args[0]);
      if (!message.guild?.me) return;
  
      if (!role) {
        return message.channel.send(lang.ADMIN.ROLE_NOT_FOUND);
      }
  
      if (message.guild.me.roles.highest.comparePositionTo(role) < 0) {
        return message.channel.send(lang.ROLES.MY_ROLE_NOT_HIGH_ENOUGH.replace("{role}", role.name));
      }
  
      message.guild.members.cache.forEach((member) => member.roles.add(role));
  
      message.channel.send(
        lang.ROLES.ADDED_ROLE_TO.replace("{role}", role.name).replace(
          "{member}",
          lang.GLOBAL.EVERYONE
        )
      );
    } catch (err) {
      bot.utils.sendErrorLog(err, "error");
      return message.channel.send(lang.GLOBAL.ERROR);
    }
  }
}
