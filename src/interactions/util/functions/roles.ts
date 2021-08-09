import * as DJS from "discord.js";
import { Bot } from "structures/Bot";

interface Field {
  name: string;
  value: string;
}

export async function roles(
  bot: Bot,
  interaction: DJS.CommandInteraction,
  lang: typeof import("@locales/english").default,
) {
  const roles = [...(interaction.guild?.roles.cache ?? new DJS.Collection()).values()];

  if (roles.length <= 0) {
    return interaction.reply({ ephemeral: true, content: "This guild does not have any roles" });
  }

  const embed = bot.utils.baseEmbed(interaction);
  const fields: Field[] = [];

  for (let i = 0; i < roles.length; i++) {
    if (i % 15 === 0) {
      const r = roles.slice(i, i + 15);

      fields.push({ name: `Page ${fields.length + 1}`, value: r.join(" ") });
    }
  }

  embed.addFields(fields);

  await interaction.reply({ embeds: [embed] });
}
