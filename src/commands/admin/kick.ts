import { Message, Permissions } from "discord.js";
import Command from "structures/Command";
import Bot from "structures/Bot";

export default class KickCommand extends Command {
  constructor(bot: Bot) {
    super(bot, {
      name: "kick",
      description: "Kick a user",
      category: "admin",
      botPermissions: [Permissions.FLAGS.KICK_MEMBERS],
      memberPermissions: [Permissions.FLAGS.KICK_MEMBERS],
    });
  }

  async execute(message: Message, args: string[]) {
    const lang = await this.bot.utils.getGuildLang(message.guild?.id);
    try {
      const kickMember = await this.bot.utils.findMember(message, args);
      let kickReason = args.slice(1).join(" ");

      if (!message.guild?.me) return;

      if (!kickMember) {
        return message.channel.send({
          content: lang.MEMBER.NOT_FOUND,
        });
      }

      if (!kickReason) kickReason = lang.GLOBAL.NOT_SPECIFIED;

      if (!kickMember.kickable || kickMember.permissions.has(Permissions.FLAGS.KICK_MEMBERS)) {
        return message.channel.send({
          content: lang.ADMIN.KICK_CANNOT_KICK,
        });
      }

      if (message.guild.me.roles.highest.comparePositionTo(kickMember.roles.highest) < 0) {
        return message.channel.send({
          content: lang.ADMIN.MY_ROLE_MUST_BE_HIGHER.replace("{member}", kickMember.user.tag),
        });
      }

      kickMember.kick(kickReason);

      try {
        kickMember.user.send({
          content: lang.ADMIN.KICK_SUCCESS_DM.replace("{guild}", message.guild.name).replace(
            "{reason}",
            kickReason,
          ),
        });
        // eslint-disable-next-line no-empty
      } catch {}

      message.channel.send({
        content: lang.ADMIN.KICK_SUCCESS.replace("{tag}", kickMember.user.tag).replace(
          "{reason}",
          kickReason,
        ),
      });

      this.bot.emit("guildKickAdd", message.guild, {
        member: kickMember,
        executor: message.author,
        reason: kickReason,
      });
    } catch (err) {
      this.bot.utils.sendErrorLog(err, "error");
      return message.channel.send({ content: lang.GLOBAL.ERROR });
    }
  }
}
