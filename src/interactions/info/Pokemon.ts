import * as DJS from "discord.js";
import { request } from "undici";
import { Bot } from "structures/Bot";
import { SubCommand } from "structures/Command/SubCommand";

export default class PokemonInfoCommand extends SubCommand {
  constructor(bot: Bot) {
    super(bot, {
      commandName: "info",
      name: "pokemon",
      description: "Returns a pokémon information",
      options: [
        {
          name: "query",
          description: "The search query",
          type: DJS.ApplicationCommandOptionType.String,
          required: true,
        },
      ],
    });
  }

  async execute(
    interaction: DJS.ChatInputCommandInteraction<"cached" | "raw">,
    lang: typeof import("@locales/english").default,
  ) {
    await interaction.deferReply();
    const query = interaction.options.getString("query", true).toLowerCase();

    const data = await request(`${this.APIs.Pokemon}${encodeURIComponent(query)}`).then((res) =>
      res.body.json(),
    );

    const embed = this.bot.utils
      .baseEmbed(interaction)
      .setTitle(data.name)
      .setDescription(data.description)
      .addFields(
        { name: "ID", value: data.id, inline: true },
        { name: lang.POKEMON.SPECIES, value: data.species.join(", "), inline: true },
        { name: lang.POKEMON.ABILITIES, value: data.abilities.join(", "), inline: true },
        { name: lang.POKEMON.HEIGHT, value: data.height, inline: true },
        { name: lang.POKEMON.WEIGHT, value: data.weight, inline: true },
        { name: lang.POKEMON.EXPERIENCE, value: data.base_experience, inline: true },
        { name: lang.POKEMON.GENDER, value: data.gender.join(" / "), inline: true },
        { name: lang.POKEMON.EGG_GROUPS, value: data.egg_groups.join(", "), inline: true },
        {
          name: `**${lang.POKEMON.FAMILY}:**`,
          value: `
  **${lang.POKEMON.EVO_STAGE}:** ${data.family.evolutionStage}
  **${lang.POKEMON.EVO_LINE}:** ${data.family.evolutionLine.join(" -> ")}
        `,
        },
        {
          name: `**${lang.POKEMON.STATS}:**`,
          value: `
    **${lang.POKEMON.HP}:** ${data.stats.hp}
    **${lang.POKEMON.ATTACK}:** ${data.stats.attack}
    **${lang.POKEMON.DEFENSE}:** ${data.stats.defense}
    **${lang.POKEMON.SP_ATK}:** ${data.stats.sp_atk}
    **${lang.POKEMON.SP_DEF}:** ${data.stats.sp_def}
    **${lang.POKEMON.SPEED}:** ${data.stats.speed}
    **${lang.POKEMON.TOTAL}:** ${data.stats.total}
    `,
        },
      )
      .setThumbnail(`${data.sprites.animated}`);

    await interaction.editReply({ embeds: [embed] });
  }
}
