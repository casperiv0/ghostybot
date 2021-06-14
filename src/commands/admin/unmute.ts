import { Message, Permissions } from "discord.js";
import Command from "structures/Command";
import Bot from "structures/Bot";

export default class UnMuteCommand extends Command {
  constructor(bot: Bot) {
    super(bot, {
      name: "unmute",
      description: "Unmute a user",
      category: "admin",
      usage: "<@user>",
      botPermissions: [Permissions.FLAGS.MANAGE_ROLES],
      memberPermissions: [Permissions.FLAGS.MANAGE_ROLES, Permissions.FLAGS.MANAGE_CHANNELS],
      requiredArgs: [{ name: "user" }],
    });
  }

  async execute(message: Message, args: string[]) {
    if (!message.guild?.me) return;

    const lang = await this.bot.utils.getGuildLang(message.guild?.id);
    try {
      const mutedMember = await this.bot.utils.findMember(message, args);
      const mutedRole = await this.bot.utils.findOrCreateMutedRole(message.guild);

      if (!mutedRole) {
        return message.channel.send({ content: lang.GLOBAL.ERROR });
      }

      if (!mutedMember) {
        return message.channel.send({
          content: lang.ADMIN.PROVIDE_VALID_MEMBER,
        });
      }

      if (!mutedMember.roles.cache.some((r) => r.id === mutedRole?.id)) {
        return message.channel.send({
          content: lang.ADMIN.NOT_MUTED,
        });
      }

      message.guild.channels.cache.forEach((channel) => {
        channel.permissionOverwrites.get(mutedMember.id)?.delete();
      });

      const user = await this.bot.utils.getUserById(mutedMember.user.id, message.guild?.id);
      if (user?.mute?.muted) {
        await this.bot.utils.updateUserById(mutedMember.user.id, message.guild?.id, {
          mute: {
            reason: null,
            muted: false,
            ends_at: 0,
            time: null,
          },
        });
      }

      mutedMember.roles.remove(mutedRole);
      message.channel.send({
        content: lang.ADMIN.SUC_UNMUTE.replace("{mutedMemberTag}", mutedMember.user.tag),
      });

      this.bot.emit("guildMuteRemove", message.guild, {
        member: mutedMember,
        executor: message.author,
      });
    } catch (err) {
      this.bot.utils.sendErrorLog(err, "error");
      return message.channel.send({ content: lang.GLOBAL.ERROR });
    }
  }
}
