import * as DJS from "discord.js";
import Bot from "structures/Bot";

export async function imgfy(
  bot: Bot,
  interaction: DJS.CommandInteraction,
  lang: typeof import("@locales/english").default,
) {
  const text = interaction.options.getString("text", true);

  const image = `https://flamingtext.com/net-fu/proxy_form.cgi?script=3d-logo&text=${encodeURIComponent(
    text,
  )}&_loc=generate&imageoutput=true`;

  const embed = bot.utils
    .baseEmbed(interaction)
    .setDescription(`${lang.IMAGE.CLICK_TO_VIEW}(${image})`)
    .setImage(image);

  await interaction.reply({ embeds: [embed] });
}
