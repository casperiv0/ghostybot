import * as DJS from "discord.js";
import Bot from "structures/Bot";

export async function store(
  bot: Bot,
  interaction: DJS.CommandInteraction,
  lang: typeof import("@locales/english").default,
) {
  const guild = await bot.utils.getGuildById(interaction.guildId!);

  if (!guild?.store || !guild.store.length) {
    return interaction.reply({
      content: lang.ECONOMY.STORE_EMPTY,
    });
  }

  const items = guild.store
    .map(
      (item) => `**${lang.GLOBAL.NAME}:** ${item.name}, **${lang.ECONOMY.PRICE}:** ${item.price}`,
    )
    .join(",\n ");

  const embed = bot.utils
    .baseEmbed(interaction)
    .setTitle(`${interaction.guild?.name} ${lang.ECONOMY.STORE}`)
    .setDescription(`${items}`);

  interaction.reply({ embeds: [embed] });
}
