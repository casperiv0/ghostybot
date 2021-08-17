import * as DJS from "discord.js";
import { Bot } from "structures/Bot";
import { SubCommand } from "structures/Command/SubCommand";

export default class TrashCommand extends SubCommand {
  constructor(bot: Bot) {
    super(bot, {
      commandName: "image",
      name: "trash",
      description: "Put someone in the trash",
      options: [
        {
          name: "user",
          description: "A user",
          type: "USER",
          required: false,
        },
      ],
    });
  }

  async execute(
    interaction: DJS.CommandInteraction,
    lang: typeof import("@locales/english").default,
  ) {
    const user = interaction.options.getUser("user") ?? interaction.user;
    const image = `${this.APIs.Thrash}${user.displayAvatarURL({ format: "png" })}`;

    const embed = this.bot.utils
      .baseEmbed(interaction)
      .setDescription(`${lang.IMAGE.CLICK_TO_VIEW}(${image})`)
      .setImage(image);

    await interaction.reply({ embeds: [embed] });
  }
}
