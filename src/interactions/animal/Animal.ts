import * as DJS from "discord.js";
import { Bot } from "structures/Bot";
import { Command } from "structures/Command/Command";
import { animalChoices, Choice } from "./choices";

export default class AnimalCommand extends Command {
  constructor(bot: Bot) {
    super(bot, {
      name: "animal",
      description: "Returns an image of an animal",
      options: [
        {
          name: "type",
          description: "The type of the animal",
          type: "STRING",
          required: true,
          choices: animalChoices.map((v) => ({ name: v.name, value: v.value })),
        },
      ],
    });
  }

  async execute(
    interaction: DJS.CommandInteraction,
    lang: typeof import("@locales/english").default,
  ) {
    try {
      const type = interaction.options.getString("type", true);

      const choice = animalChoices.find((v) => v.value === type) as Choice;
      const url = await choice.fetchUrl();

      const embed = this.bot.utils
        .baseEmbed(interaction)
        .setDescription(`${lang.IMAGE.CLICK_TO_VIEW}(${url})`)
        .setImage(url);

      await interaction.reply({ embeds: [embed] });
    } catch (err) {
      this.bot.utils.sendErrorLog(err, "error");
      return interaction.reply(lang.GLOBAL.ERROR);
    }
  }
}
