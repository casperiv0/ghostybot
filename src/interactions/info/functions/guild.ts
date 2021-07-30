import Bot from "structures/Bot";
import { time } from "@discordjs/builders";
import * as DJS from "discord.js";

export async function guildInfo(
  bot: Bot,
  interaction: DJS.CommandInteraction,
  lang: typeof import("@locales/english").default,
) {
  const { guild } = interaction;

  if (!guild) {
    return interaction.reply({ ephemeral: true, content: lang.GLOBAL.ERROR });
  }

  const roles = bot.utils.formatNumber(guild.roles.cache.size);
  const channels = bot.utils.formatNumber(guild.channels.cache.size);
  const emojis = bot.utils.formatNumber(guild.emojis.cache.size);

  const verLevels = lang.OTHER.VERLEVELS;
  const mfaLevels = lang.OTHER.MFA_LEVELS;

  const member = await bot.utils.findMember(interaction, [interaction.user.id]);

  const joinedAt = member?.joinedAt ? time(new Date(member.joinedAt), "F") : "Unknown";

  const owner = await guild.fetchOwner();
  const inviteBanner = guild.bannerURL({
    size: 2048,
    format: "png",
  });

  const verLevel = verLevels[guild.verificationLevel];
  const mfaLevel = mfaLevels[guild.mfaLevel];

  const embed = bot.utils
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
      "**📈 Stats**",
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

  interaction.reply({ embeds: [embed] });
}
