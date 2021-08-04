import { Message, Permissions, Snowflake } from "discord.js";
import Command from "structures/Command";
import Bot from "structures/Bot";

export default class RemoveRoleCommand extends Command {
  constructor(bot: Bot) {
    super(bot, {
      name: "removerole",
      aliases: ["rr", "rrole", "takerole"],
      description: "Remove a role from a user",
      category: "admin",
      botPermissions: [Permissions.FLAGS.MANAGE_ROLES],
      memberPermissions: [Permissions.FLAGS.MANAGE_ROLES],
      requiredArgs: [{ name: "member" }, { name: "role" }],
    });
  }

  async execute(message: Message, args: string[]) {
    if (!message.guild?.me) return;
    const lang = await this.bot.utils.getGuildLang(message.guild?.id);
    try {
      const needsRole = await this.bot.utils.findMember(message, args);
      const role = await this.bot.utils.findRole(message, args[1] as Snowflake);

      if (!needsRole) {
        return message.channel.send({
          content: lang.ADMIN.PROVIDE_VALID_MEMBER,
        });
      }

      if (!role) {
        return message.channel.send({
          content: lang.ADMIN.ROLE_NOT_FOUND,
        });
      }

      if (message.guild.me.roles.highest.comparePositionTo(role) < 0) {
        return message.channel.send({
          content: lang.ADMIN.MY_ROLE_MUST_BE_HIGHER.replace("{roleName}", role.name),
        });
      }

      if (message.guild.me.roles.highest.comparePositionTo(needsRole.roles.highest) < 0) {
        return message.channel.send({
          content: lang.ADMIN.MY_ROLE_MUST_BE_HIGHER2.replace(
            "{needsRoleTag}",
            needsRole?.user?.tag,
          ),
        });
      }

      if (!needsRole) {
        return message.channel.send({
          content: lang.ADMIN.USER_WAS_NOT_FOUND,
        });
      }

      needsRole.roles.remove(role.id);

      return message.channel.send({
        content: lang.ADMIN.REMOVED_ROLE.replace("{roleName}", role.name).replace(
          "{needsRole}",
          `${needsRole?.user?.tag}`,
        ),
      });
    } catch (err) {
      this.bot.utils.sendErrorLog(err, "error");
      return message.channel.send({ content: lang.GLOBAL.ERROR });
    }
  }
}
