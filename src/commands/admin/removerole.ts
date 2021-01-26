import { Message } from "discord.js";
import Command from "../../structures/Command";
import Bot from "../../structures/Bot";

export default class RemoveRoleCommand extends Command {
  constructor(bot: Bot) {
    super(bot, {
      name: "removerole",
      aliases: ["rr", "rrole", "takerole"],
      description: "Remove a role from a user",
      category: "admin",
      botPermissions: ["MANAGE_ROLES"],
      memberPermissions: ["MANAGE_ROLES"],
      requiredArgs: [{ name: "member" }, { name: "role" }],
    });
  }

  async execute(bot: Bot, message: Message, args: string[]) {
    if (!message.guild?.me) return;
    const lang = await bot.utils.getGuildLang(message.guild?.id);
    try {
      const needsRole = await bot.utils.findMember(message, args);
      const role = await bot.utils.findRole(message, args[1]);

      if (!needsRole) {
        return message.channel.send(lang.ADMIN.PROVIDE_VALID_MEMBER);
      }

      if (!role) {
        return message.channel.send(lang.REACTIONS.NO_ROLE);
      }

      if (message.guild.me.roles.highest.comparePositionTo(role) < 0) {
        return message.channel.send(
          lang.ADMIN.MY_ROLE_MUST_BE_HIGHER.replace("{roleName}", role.name)
        );
      }

      if (message.guild.me.roles.highest.comparePositionTo(needsRole.roles.highest) < 0) {
        return message.channel.send(
          lang.ADMIN.MY_ROLE_MUST_BE_HIGHER2.replace("{needsRoleTag}", needsRole?.user?.tag)
        );
      }

      if (!needsRole) {
        return message.channel.send(lang.ADMIN.USER_WAS_NOT_FOUND);
      }

      needsRole.roles.remove(role.id);

      message.channel.send(
        lang.ADMIN.REMOVED_ROLE.replace("{roleName}", role.name).replace(
          "{needsRole}",
          `${needsRole?.user?.tag}`
        )
      );
    } catch (err) {
      bot.utils.sendErrorLog(err, "error");
      return message.channel.send(lang.GLOBAL.ERROR);
    }
  }
}
