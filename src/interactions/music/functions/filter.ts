import Bot from "structures/Bot";
import * as DJS from "discord.js";
import filters from "assets/json/filters.json";

export async function filter(
  bot: Bot,
  interaction: DJS.CommandInteraction,
  lang: typeof import("@locales/english").default,
) {
  const filter = interaction.options.getString("filter", true);

  const queue = bot.player.getQueue(interaction.guildId!);
  if (!queue || !queue.playing) {
    return interaction.reply({ ephemeral: true, content: lang.MUSIC.NO_QUEUE });
  }

  if (!filters.includes(filter)) {
    return interaction.reply({ ephemeral: true, content: lang.MUSIC.FILTER_NOT_FOUND });
  }

  const didEnableFilter = didEnableFilterFunc(bot, interaction, filter);

  bot.player.setFilter(interaction.guildId!, filter);

  if (didEnableFilter) {
    await interaction.reply(lang.MUSIC.SUC_APPLIED_FILTER.replace("{filter}", filter));
  } else {
    await interaction.reply(lang.MUSIC.SUC_REM_FILTER.replace("{filter}", filter));
  }
}

function didEnableFilterFunc(
  bot: Bot,
  interaction: DJS.CommandInteraction,
  filterToCheck: string,
): boolean {
  const queueFilters = bot.player.getQueue(interaction.guildId!)?.filters;

  return !queueFilters?.includes(filterToCheck) ?? true;
}
