import fetch from "node-fetch";
import * as DJS from "discord.js";
import Bot from "structures/Bot";

export async function pokemon(
  bot: Bot,
  interaction: DJS.CommandInteraction,
  lang: typeof import("@locales/english").default,
) {
  await interaction.defer();
  const query = interaction.options.getString("query", true).toLowerCase();

  const data = await fetch(
    `https://some-random-api.ml/pokedex?pokemon=${encodeURIComponent(query)}`,
  ).then((res) => res.json());

  const embed = bot.utils
    .baseEmbed(interaction)
    .setTitle(data.name)
    .setDescription(data.description)
    .addField("ID", data.id, true)
    .addField(lang.POKEMON.SPECIES, data.species.join(", "), true)
    .addField(lang.POKEMON.ABILITIES, data.abilities.join(", "), true)
    .addField(lang.POKEMON.HEIGHT, data.height, true)
    .addField(lang.POKEMON.WEIGHT, data.weight, true)
    .addField(lang.POKEMON.EXPERIENCE, data.base_experience, true)
    .addField(lang.POKEMON.GENDER, data.gender.join(" / "), true)
    .addField(lang.POKEMON.EGG_GROUPS, data.egg_groups.join(", "), true)
    .addField(
      `**${lang.POKEMON.FAMILY}:**`,
      `
**${lang.POKEMON.EVO_STAGE}:** ${data.family.evolutionStage}
**${lang.POKEMON.EVO_LINE}:** ${data.family.evolutionLine.join(" -> ")}
      `,
    )
    .addField(
      `**${lang.POKEMON.STATS}:**`,
      `
**${lang.POKEMON.HP}:** ${data.stats.hp}
**${lang.POKEMON.ATTACK}:** ${data.stats.attack}
**${lang.POKEMON.DEFENSE}:** ${data.stats.defense}
**${lang.POKEMON.SP_ATK}:** ${data.stats.sp_atk}
**${lang.POKEMON.SP_DEF}:** ${data.stats.sp_def}
**${lang.POKEMON.SPEED}:** ${data.stats.speed}
**${lang.POKEMON.TOTAL}:** ${data.stats.total}
`,
    )
    .setThumbnail(`${data.sprites.animated}`);

  await interaction.editReply({ embeds: [embed] });
}
