import * as DJS from "discord.js";
import { Bot } from "structures/Bot";
import fetch from "node-fetch";
import { ValidateReturn } from "structures/Command/BaseCommand";
import { SubCommand } from "structures/Command/SubCommand";

export default class GiphyCommand extends SubCommand {
  constructor(bot: Bot) {
    super(bot, {
      commandName: "image",
      name: "giphy",
      description: "Return a giphy image",
      options: [
        {
          name: "query",
          description: "A search query for the image",
          required: true,
          type: "STRING",
        },
      ],
    });
  }

  async validate(
    _: DJS.CommandInteraction,
    lang: typeof import("@locales/english").default,
  ): Promise<ValidateReturn> {
    if (!process.env["GIPHY_API_KEY"]) {
      return {
        ok: false,
        error: {
          ephemeral: true,
          content: lang.IMAGE.NO_GIPHY_KEY,
        },
      };
    }

    return { ok: true };
  }

  async execute(
    interaction: DJS.CommandInteraction,
    lang: typeof import("@locales/english").default,
  ) {
    await interaction.deferReply();

    const api_key = process.env["GIPHY_API_KEY"];
    const query = interaction.options.getString("query", true);
    const q = encodeURIComponent(query);

    const limit = 1;
    const rating = "pg-13";
    const randomInt = Math.floor(Math.random() * 100);
    const url = `https://api.giphy.com/v1/gifs/search?api_key=${api_key}&q=${q}&lang=en&rating=${rating}&limit=${limit}&offset=${randomInt}`;
    const res = (await (await fetch(url)).json()) as any;
    const [data] = res.data;

    if (!data) {
      return interaction.reply({
        content: lang.IMAGE.NO_GPIHY_FOUND,
      });
    }

    const image = data.images.original.url;

    const embed = this.bot.utils
      .baseEmbed(interaction)
      .setTitle(data.title)
      .setDescription(`${lang.IMAGE.CLICK_TO_VIEW}(${data.url})`)
      .setImage(`${image}`);

    await interaction.editReply({ embeds: [embed] });
  }
}
