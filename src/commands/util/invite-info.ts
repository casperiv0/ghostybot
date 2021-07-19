import { Message } from "discord.js";
import { time } from "@discordjs/builders";
import Command from "structures/Command";
import Bot from "structures/Bot";

export default class InviteInfoCommand extends Command {
  constructor(bot: Bot) {
    super(bot, {
      name: "invite-info",
      description: "Get information about an invite",
      category: "util",
      aliases: ["inviteinfo"],
      requiredArgs: [{ name: "code" }],
    });

    this.resolveCode = this.resolveCode.bind(this);
  }

  resolveCode(str: string) {
    const split = str.split("/");
    return split[split.length - 1];
  }

  async execute(message: Message, args: string[]) {
    const lang = await this.bot.utils.getGuildLang(message.guild?.id);

    try {
      const [code] = args;

      const invite = await message.guild?.invites.fetch(this.resolveCode(code)).catch(() => null);

      if (!invite) {
        return message.channel.send(lang.INVITE.NOT_FOUND);
      }

      const doesInviteExpire = !!invite.expiresAt;

      const expiresAt = doesInviteExpire
        ? time(new Date(invite.expiresAt!), "f")
        : lang.INVITE.NOT_EXPIRE;

      const hasExpired =
        (invite as any).expired_at && new Date((invite as any).expired_at).getTime() <= Date.now();

      const expiredAt = doesInviteExpire
        ? hasExpired && (invite as any).expired_at
          ? time(new Date((invite as any).expired_at), "f")
          : lang.INVITE.NOT_EXPIRED_YET
        : lang.INVITE.NOT_EXPIRE;

      const inviter = invite.inviter
        ? `${invite.inviter?.username}#${invite.inviter.discriminator} (${invite.inviter.id})`
        : "Unknown";

      const uses = invite.uses ? this.bot.utils.formatNumber(invite.uses) : null;
      const maxUses = invite.maxUses;
      const usesStr = (maxUses && uses ? `${uses}/${maxUses}` : uses) ?? "Unknown";

      const embed = this.bot.utils
        .baseEmbed(message)
        .setTitle(`Invite: ${invite.code}`)
        .setDescription(invite.guild?.description || "No description")
        .addField(
          "General Info",
          `
**Uses:**: ${usesStr}
**Guild:** ${invite.guild?.name ?? "Unknown"} (${invite.guild?.id ?? "Unknown"})
**Channel:** ${invite.channel.name}
**Inviter:** ${inviter}
        `,
        )
        .addField(
          lang.INVITE.EXPIRATION,
          `
**${lang.INVITE.EXPIRES_AT}:** ${expiresAt}
**${lang.INVITE.EXPIRED_AT}:** ${expiredAt}`,
        );

      if (invite.guild?.icon) {
        const extension = invite.guild.icon.startsWith("a_") ? "gif" : "webp";
        const url = `https://cdn.discordapp.com/icons/${invite.guild.id}/${invite.guild.icon}.${extension}?size=1024`;
        embed.setThumbnail(url);
      }

      if (invite.guild?.banner) {
        const url = `https://cdn.discordapp.com/banners/${invite.guild.id}/${invite.guild.banner}.webp?size=1024`;
        embed.setImage(url);
      }

      return message.channel.send({ embeds: [embed] });
    } catch (err) {
      this.bot.utils.sendErrorLog(err, "error");
      return message.channel.send(lang.GLOBAL.ERROR);
    }
  }
}
