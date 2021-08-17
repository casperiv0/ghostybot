import * as DJS from "discord.js";
import { time } from "@discordjs/builders";
import { Bot } from "structures/Bot";
import { SubCommand } from "structures/Command/SubCommand";

export default class InviteInfoCommand extends SubCommand {
  constructor(bot: Bot) {
    super(bot, {
      commandName: "info",
      name: "invite",
      description: "Get information about an invite code",
      options: [
        {
          description: "The invite code",
          name: "code",
          required: true,
          type: "STRING",
        },
      ],
    });
  }

  async execute(
    interaction: DJS.CommandInteraction,
    lang: typeof import("@locales/english").default,
  ) {
    await interaction.deferReply();

    const code = interaction.options.getString("code", true);
    const invite = await this.bot.fetchInvite(this.resolveCode(code)).catch(() => null);

    if (!invite) {
      return interaction.editReply(lang.INVITE.NOT_FOUND);
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
      : lang.UTIL.UNKNOWN;

    const uses = invite.uses ? this.bot.utils.formatNumber(invite.uses) : null;
    const maxUses = invite.maxUses;
    const usesStr = (maxUses && uses ? `${uses}/${maxUses}` : uses) ?? lang.UTIL.UNKNOWN;

    const embed = this.bot.utils
      .baseEmbed(interaction)
      .setTitle(`${lang.UTIL.INVITE}: ${invite.code}`)
      .setDescription(invite.guild?.description || lang.UTIL.NO_DESCRIPTION)
      .addField(
        lang.UTIL.GENERAL_INFO,
        `
**${lang.UTIL.USES}:**: ${usesStr}
**${lang.UTIL.GUILD}:** ${invite.guild?.name ?? lang.UTIL.UNKNOWN} (${
          invite.guild?.id ?? lang.UTIL.UNKNOWN
        })
**${lang.UTIL.CHANNEL}:** ${invite.channel.name}
**${lang.UTIL.INVITER}:** ${inviter}
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

    return interaction.editReply({ embeds: [embed] });
  }

  resolveCode(str: string) {
    const split = str.split("/");
    return split[split.length - 1];
  }
}
