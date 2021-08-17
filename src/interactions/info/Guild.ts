import * as DJS from "discord.js";
import { time } from "@discordjs/builders";
import { Bot } from "structures/Bot";
import { SubCommand } from "structures/Command/SubCommand";

export default class GuildInfoCommand extends SubCommand {
  constructor(bot: Bot) {
    super(bot, {
      commandName: "info",
      name: "guild",
      description: "Get information about the current guild",
    });
  }

  async execute(
    interaction: DJS.CommandInteraction,
    lang: typeof import("@locales/english").default,
  ) {
    await interaction.deferReply();

    const { guild } = interaction;
    if (!guild) return;

    const roles = this.bot.utils.formatNumber(guild.roles.cache.size);
    const channels = this.bot.utils.formatNumber(guild.channels.cache.size);
    const emojis = this.bot.utils.formatNumber(guild.emojis.cache.size);

    const verLevels = lang.OTHER.VERLEVELS;
    const mfaLevels = lang.OTHER.MFA_LEVELS;

    const member = await this.bot.utils.findMember(interaction, [interaction.user.id]);

    const joinedAt = member?.joinedAt ? time(new Date(member.joinedAt), "F") : lang.UTIL.UNKNOWN;

    const owner = await guild.fetchOwner();
    const inviteBanner = guild.bannerURL({
      size: 2048,
      format: "png",
    });

    const verLevel = verLevels[guild.verificationLevel];
    const mfaLevel = mfaLevels[guild.mfaLevel];

    const embed = this.bot.utils
      .baseEmbed(interaction)
      .setTitle(guild.name)
      .setDescription(
        `
**${lang.GUILD.OWNER}:** ${owner}
**${lang.GUILD.MFA}:** ${mfaLevel}
**${lang.GUILD.VERIFICATION}:** ${verLevel}

**${lang.MEMBER.JOINED_AT}:** ${joinedAt}
**${lang.MEMBER.CREATED_ON}:** ${time(new Date(guild.createdAt), "F")}`,
      )
      .addField(
        `**📈 ${lang.POKEMON.STATS}**`,
        `
**${lang.GUILD.ROLES_C}:** ${roles}
**${lang.GUILD.CHANNEL_C}:** ${channels}
**${lang.GUILD.EMOJI_C}:** ${emojis}
**${lang.GUILD.MEMBER_C}:** ${guild.memberCount}`,
      );

    if (inviteBanner !== null) {
      embed.setImage(inviteBanner);
    }

    if (guild.icon !== null) {
      embed.setThumbnail(`${guild.iconURL({ format: "png", size: 1024 })}`);
    }

    await interaction.editReply({ embeds: [embed] });
  }
}
