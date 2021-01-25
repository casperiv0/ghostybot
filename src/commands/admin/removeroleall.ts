import { Message } from "discord.js";
import Command from "../../structures/Command";
import Bot from "../../structures/Bot";

export default class RemoveRoleAllCommand extends Command {
  constructor(bot: Bot) {
    super(bot, {
      name: "removeroleall",
      aliases: ["rrall", "rroleall", "takeroleall"],
      description: "remove a role from all users of the current server",
      category: "admin",
      botPermissions: ["MANAGE_ROLES"],
      memberPermissions: ["MANAGE_ROLES"],
      requiredArgs: [{ name: "role" }],
    });
  }

  async execute(bot: Bot, message: Message, args: string[]) {
    if (!message.guild?.me) return;
    const lang = await bot.utils.getGuildLang(message.guild?.id);
    try {
      const role = await bot.utils.findRole(message, args.join(" "));

      if (!role) {
        return message.channel.send(lang.ADMIN.ROLE_NOT_FOUND);
      }

      if (message.guild.me.roles.highest.comparePositionTo(role) < 0) {
        return message.channel.send(
          lang.ROLES.MY_ROLE_NOT_HIGH_ENOUGH.replace("{role}", role.name)
        );
      }

      message.guild.members.cache.forEach((member) => member.roles.remove(role));

      message.channel.send(lang.ADMIN.REMOVED_ROLE_EVERYONE.replace("{roleName}", role.name));
    } catch (err) {
      bot.utils.sendErrorLog(err, "error");
      return message.channel.send(lang.GLOBAL.ERROR);
    }
  }
}
