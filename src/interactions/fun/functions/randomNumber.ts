import * as DJS from "discord.js";

export async function randomNumber(interaction: DJS.CommandInteraction) {
  await interaction.reply({
    content: (Math.floor(Math.random() * 1000000) + 1).toString(),
  });
}
