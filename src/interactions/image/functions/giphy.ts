import * as DJS from "discord.js";
import Bot from "structures/Bot";

export async function giphy(
  bot: Bot,
  interaction: DJS.CommandInteraction,
  lang: typeof import("@locales/english").default,
) {
  if (!process.env["GIPHY_API_KEY"]) {
    return interaction.reply({
      ephemeral: true,
      content: lang.IMAGE.NO_GIPHY_KEY,
    });
  }

  await interaction.deferReply();

  const api_key = process.env["GIPHY_API_KEY"];
  const query = interaction.options.getString("query", true);
  const q = encodeURIComponent(query);

  const limit = 1;
  const rating = "pg-13";
  const randomInt = Math.floor(Math.random() * 100);
  const url = `https://api.giphy.com/v1/gifs/search?api_key=${api_key}&q=${q}&lang=en&rating=${rating}&limit=${limit}&offset=${randomInt}`;
  const res = await (await fetch(url)).json();
  const [data] = res.data;

  if (!data) {
    return interaction.reply({
      content: lang.IMAGE.NO_GPIHY_FOUND,
    });
  }

  const image = data.images.original.url;

  const embed = bot.utils
    .baseEmbed(interaction)
    .setTitle(data.title)
    .setDescription(`${lang.IMAGE.CLICK_TO_VIEW}(${data.url})`)
    .setImage(`${image}`);

  await interaction.editReply({ embeds: [embed] });
}
