import * as DJS from "discord.js";
import wiki from "wikijs";
import { Bot } from "structures/Bot";
import { SubCommand } from "structures/Command/SubCommand";

export default class WikiCommand extends SubCommand {
  constructor(bot: Bot) {
    super(bot, {
      commandName: "util",
      name: "wiki",
      description: "Search something up on Wikipedia",
      options: [
        {
          name: "query",
          required: true,
          description: "The query",
          type: "STRING",
        },
      ],
    });
  }

  async execute(
    interaction: DJS.CommandInteraction,
    lang: typeof import("@locales/english").default,
  ) {
    const query = interaction.options.getString("query", true);
    const search = await wiki().search(query);

    if (!search.results[0]) {
      return interaction.reply({ ephemeral: true, content: lang.UTIL.NO_W_FOUND });
    }

    const result = await wiki().page(search.results[0]);
    const description = await result.summary();

    const title = result.raw.title;
    const url = result.raw.fullurl;

    const embed = this.bot.utils
      .baseEmbed(interaction)
      .setTitle(`${title} (${lang.UTIL.READ_MORE})`)
      .setURL(url)
      .setDescription(`${description.slice(0, 2045)}${description.length > 2048 ? "..." : ""}`);

    await interaction.reply({ embeds: [embed] });
  }
}
