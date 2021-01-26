import { Message } from "discord.js";
import Command from "../../structures/Command";
import Bot from "../../structures/Bot";

export default class AddRoleCommand extends Command {
  constructor(bot: Bot) {
    super(bot, {
      name: "addrole",
      aliases: ["ar", "arole", "giverole"],
      description: "Add a role to a user",
      usage: "<member> <role>",
      category: "admin",
      memberPermissions: ["SEND_MESSAGES", "MANAGE_ROLES", "ADMINISTRATOR"],
      botPermissions: ["MANAGE_ROLES"],
      requiredArgs: [{ name: "member" }, { name: "role" }],
    });
  }

  async execute(bot: Bot, message: Message, args: string[]) {
    const lang = await bot.utils.getGuildLang(message.guild?.id);

    try {
      const needsRole = await bot.utils.findMember(message, args);
      const role = await bot.utils.findRole(message, args[1]);
  
      if (!message.guild?.me) return;
  
      if (!needsRole) {
        return message.channel.send(lang.MEMBER.NOT_FOUND);
      }
  
      if (!role) {
        return message.channel.send(lang.ADMIN.ROLE_NOT_FOUND);
      }
  
      if (message.guild.me.roles.highest.comparePositionTo(role) < 0) {
        return message.channel.send(lang.ROLES.MY_ROLE_NOT_HIGH_ENOUGH.replace("{role}", role.name));
      }
  
      if (message.guild.me.roles.highest.comparePositionTo(needsRole.roles.highest) < 0)
        return message.channel.send(
          lang.ROLES.MY_ROLE_MUST_BE_HIGHER.replace("{member}", needsRole.user.username)
        );
  
      if (needsRole.roles.cache.some((r) => role.id === r.id)) {
        return message.channel.send(lang.ROLES.ALREADY_HAS_ROLE);
      }
  
      needsRole.roles.add(role.id);
  
      message.channel.send(
        lang.ROLES.ADDED_ROLE_TO.replace("{role}", role.name).replace(
          "{member}",
          needsRole.user.username
        )
      );
    } catch (err) {
      bot.utils.sendErrorLog(err, "error");
      return message.channel.send(lang.GLOBAL.ERROR);
    }
  }
}
