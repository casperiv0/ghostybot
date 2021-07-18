import { Message } from "discord.js";
import { APIInvite } from "discord-api-types";
import fetch from "node-fetch";
import Command from "structures/Command";
import Bot from "structures/Bot";
import { time } from "@discordjs/builders";

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

      const data: APIInvite = await fetch(
        `https://discord.com/api/v9/invites/${this.resolveCode(
          code,
        )}?with_counts=true&with_expiration=true`,
      ).then((r) => r.json());

      if ((data as any).message) {
        return message.channel.send(lang.INVITE.NOT_FOUND);
      }

      const doesInviteExpire = !!data.expires_at;

      const expiresAt = doesInviteExpire
        ? time(new Date(data.expires_at!), "f")
        : lang.INVITE.NOT_EXPIRE;

      const hasExpired =
        (data as any).expired_at && new Date((data as any).expired_at).getTime() <= Date.now();

      const expiredAt = doesInviteExpire
        ? hasExpired && (data as any).expired_at
          ? time(new Date((data as any).expired_at), "f")
          : lang.INVITE.NOT_EXPIRED_YET
        : lang.INVITE.NOT_EXPIRE;

      const inviter = data.inviter
        ? `${data.inviter?.username}#${data.inviter.discriminator} (${data.inviter.id})`
        : "Unknown";

      const embed = this.bot.utils
        .baseEmbed(message)
        .setTitle(`Invite: ${data.code}`)
        .setDescription(data.guild?.description || "No description")
        .addField(
          "General Info",
          `
**Guild:** ${data.guild?.name ?? "Unknown"} (${data.guild?.id ?? "Unknown"})
**Channel:** ${data.channel.name}
**Inviter:** ${inviter}
        `,
        )
        .addField(
          lang.INVITE.EXPIRATION,
          `
**${lang.INVITE.EXPIRES_AT}:** ${expiresAt}
**${lang.INVITE.EXPIRED_AT}:** ${expiredAt}`,
        );

      if (data.guild?.icon) {
        const extension = data.guild.icon.startsWith("a_") ? "gif" : "webp";
        const url = `https://cdn.discordapp.com/icons/${data.guild.id}/${data.guild.icon}.${extension}?size=1024`;
        embed.setThumbnail(url);
      }

      if (data.guild?.banner) {
        const url = `https://cdn.discordapp.com/banners/${data.guild.id}/${data.guild.banner}.webp?size=1024`;
        embed.setImage(url);
      }

      return message.channel.send({ embeds: [embed] });
    } catch (err) {
      this.bot.utils.sendErrorLog(err, "error");
      return message.channel.send(lang.GLOBAL.ERROR);
    }
  }
}
