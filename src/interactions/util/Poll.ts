import * as DJS from "discord.js";
import { Bot } from "structures/Bot";
import { SubCommand } from "structures/Command/SubCommand";

export default class PollCommand extends SubCommand {
  constructor(bot: Bot) {
    super(bot, {
      commandName: "util",
      name: "poll",
      description: "Create a poll in the current channel",
      options: [
        {
          name: "question",
          type: "STRING",
          required: true,
          description: "The question",
        },
      ],
    });
  }

  async execute(
    interaction: DJS.CommandInteraction,
    lang: typeof import("@locales/english").default,
  ) {
    const question = interaction.options.getString("question", true);

    const embed = this.bot.utils
      .baseEmbed(interaction)
      .setAuthor(lang.UTIL.CREATED_BY.replace("{member}", interaction.user.tag))
      .setDescription(question);

    embed.footer = null;

    const sentMessage = await interaction.reply({ fetchReply: true, embeds: [embed] });

    if (sentMessage instanceof DJS.Message) {
      sentMessage.react("👍");
      sentMessage.react("👎");
      sentMessage.react("🤷");
    } else {
      interaction.editReply({ content: lang.GLOBAL.ERROR });
    }
  }
}
