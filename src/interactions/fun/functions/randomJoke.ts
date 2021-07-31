import * as DJS from "discord.js";
import { getRandomJoke } from "one-liner-joke";

export async function randomJoke(interaction: DJS.CommandInteraction) {
  await interaction.reply({
    content: getRandomJoke({ exclude_tags: ["dirty", "racist", "marriage", "sex", "death"] }).body,
  });
}
