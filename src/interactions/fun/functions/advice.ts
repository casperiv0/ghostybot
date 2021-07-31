import * as DJS from "discord.js";

export async function advice(interaction: DJS.CommandInteraction) {
  await interaction.defer();
  const data = await fetch("https://api.adviceslip.com/advice").then((res) => res.json());

  await interaction.editReply({ content: data.slip.advice });
}
