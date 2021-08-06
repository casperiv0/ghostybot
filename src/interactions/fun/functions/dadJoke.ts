import * as DJS from "discord.js";

export async function dadJoke(interaction: DJS.CommandInteraction) {
  await interaction.deferReply();

  const data = await fetch("https://icanhazdadjoke.com/slack").then((res) => res.json());

  await interaction.editReply({ content: data.attachments[0].fallback });
}
