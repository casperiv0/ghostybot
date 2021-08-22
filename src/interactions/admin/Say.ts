import * as DJS from "discord.js";
import { Bot } from "structures/Bot";
import { SubCommand } from "structures/Command/SubCommand";

export default class SayCommand extends SubCommand {
  constructor(bot: Bot) {
    super(bot, {
      commandName: "admin",
      name: "say",
      description: "Let the bot say something",
      memberPermissions: [DJS.Permissions.FLAGS.MANAGE_GUILD],
      options: [
        {
          name: "text",
          type: "STRING",
          required: true,
          description: "The text",
        },
        {
          name: "embed",
          type: "BOOLEAN",
          required: false,
          description: "Send the text in an embed",
        },
      ],
    });
  }

  async execute(interaction: DJS.CommandInteraction) {
    const embed = interaction.options.getBoolean("embed");
    const text = interaction.options.getString("text", true);

    if (embed) {
      const embed = this.bot.utils.baseEmbed(interaction).setDescription(text);
      return interaction.reply({ embeds: [embed] });
    }

    await interaction.reply({ content: text });
  }
}
