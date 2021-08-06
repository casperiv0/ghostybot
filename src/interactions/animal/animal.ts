import { CommandInteraction } from "discord.js";
import { Bot } from "structures/Bot";
import { Interaction } from "structures/Interaction";
import { animalChoices, Choice } from "./choices";

export default class AnimalCommand extends Interaction {
  constructor(bot: Bot) {
    super(bot, {
      name: "animal",
      description: "Returns an image of an animal",
      category: "animal",
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

  async execute(interaction: CommandInteraction) {
    const lang = await this.bot.utils.getGuildLang(interaction.guild?.id);

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
