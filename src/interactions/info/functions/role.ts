import { Bot } from "structures/Bot";
import { bold, time } from "@discordjs/builders";
import * as DJS from "discord.js";
import { APIRole } from "discord-api-types";

export async function roleInfo(
  bot: Bot,
  interaction: DJS.CommandInteraction,
  lang: typeof import("@locales/english").default,
) {
  const role = interaction.options.getRole("role", true);

  const permissions = getPermissions(role, lang);

  const mentionable = role.mentionable ? lang.GLOBAL.YES : lang.GLOBAL.NO;
  const color = role.color || "#5865f2";
  const position = (interaction.guild?.roles.cache.size ?? 0) - role.position;
  const createdAt = "createdAt" in role ? time(new Date(role.createdAt), "F") : lang.UTIL.UNKNOWN;
  const hexColor =
    "hexColor" in role ? role.hexColor : `#${role.color.toString(16).padStart(6, "0")}`;

  const embed = bot.utils
    .baseEmbed(interaction)
    .setTitle(bold(role.name))
    .setColor(color)
    .setDescription(
      `
${bold(lang.UTIL.POSITION)}: ${position}
${bold(lang.UTIL.MENTIONABLE)}: ${mentionable}
${bold("ID")}: ${role.id}
${bold(lang.UTIL.HEX_COLOR)}: ${hexColor}
${bold(lang.MEMBER.CREATED_ON)}: ${createdAt}`,
    )
    .addField(lang.UTIL.ROLE_MENTION, `<@&${role.id}>`)
    .addField(lang.MEMBER.PERMISSIONS, permissions);

  interaction.reply({ embeds: [embed] });
}

function getPermissions(role: DJS.Role | APIRole, lang) {
  const perms = new DJS.Permissions(role.permissions as any);

  return perms.toArray().length <= 0
    ? lang.GLOBAL.NONE
    : `\`\`\`${perms
        .toArray()
        .map((p) => lang.PERMISSIONS[p])
        .join(", ")}\`\`\``;
}
