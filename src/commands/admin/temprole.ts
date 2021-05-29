import { Message, Permissions } from "discord.js";
import ms from "ms";
import Command from "structures/Command";
import Bot from "structures/Bot";

export default class TempRoleCommand extends Command {
  constructor(bot: Bot) {
    super(bot, {
      name: "temprole",
      description: "Give someone a role temporary",
      usage: "<member> <role> <time>",
      category: "admin",
      memberPermissions: [Permissions.FLAGS.SEND_MESSAGES, Permissions.FLAGS.MANAGE_ROLES],
      botPermissions: [Permissions.FLAGS.MANAGE_ROLES],
      requiredArgs: [{ name: "member" }, { name: "role" }, { name: "time", type: "time" }],
    });
  }

  async execute(message: Message, args: string[]) {
    const lang = await this.bot.utils.getGuildLang(message.guild?.id);
    if (!message.guild?.me) return;

    try {
      const needsRole = await this.bot.utils.findMember(message, args);
      const role = await this.bot.utils.findRole(message, args[1]);
      const [, , time] = args;

      if (!needsRole) {
        return message.channel.send(lang.MEMBER.NOT_FOUND);
      }

      if (!role) {
        return message.channel.send(lang.ADMIN.ROLE_NOT_FOUND);
      }

      if (message.guild.me.roles.highest.comparePositionTo(role) < 0) {
        return message.channel.send(
          lang.ROLES.MY_ROLE_NOT_HIGH_ENOUGH.replace("{role}", role.name),
        );
      }

      if (message.guild.me.roles.highest.comparePositionTo(needsRole.roles.highest) < 0) {
        return message.channel.send(
          lang.ROLES.MY_ROLE_MUST_BE_HIGHER.replace("{member}", needsRole.user.username),
        );
      }

      if (needsRole.roles.cache.some((r) => role.id === r.id)) {
        return message.channel.send(lang.ROLES.ALREADY_HAS_ROLE);
      }

      needsRole.roles.add(role);

      const user = await this.bot.utils.getUserById(needsRole.user.id, message.guild.id);
      await this.bot.utils.updateUserById(needsRole.user.id, message.guild.id, {
        temproles: {
          hasTempRoles: true,
          tempRoles: [
            ...(user?.temproles.tempRoles ?? []),
            {
              roleId: role.id,
              ms: Date.now() + ms(time),
            },
          ],
        },
      });

      message.channel.send(
        `Successfully added the **${role.name}** role for **${time}** to ${needsRole.user.tag}`,
      );
    } catch (err) {
      this.bot.utils.sendErrorLog(err, "error");
      return message.channel.send(lang.GLOBAL.ERROR);
    }
  }
}
