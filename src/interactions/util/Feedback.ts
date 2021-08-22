import * as DJS from "discord.js";
import { Bot } from "structures/Bot";
import { ValidateReturn } from "structures/Command/BaseCommand";
import { SubCommand } from "structures/Command/SubCommand";

export default class FeedbackCommand extends SubCommand {
  constructor(bot: Bot) {
    super(bot, {
      commandName: "util",
      name: "feedback",
      description: "Send feedback to the bot developer",
      options: [
        {
          name: "text",
          required: true,
          description: "The feedback description",
          type: "STRING",
        },
      ],
    });
  }

  async validate(): Promise<ValidateReturn> {
    if (!process.env["FEEDBACK_CHANNEL_ID"]) {
      return {
        ok: false,
        error: {
          ephemeral: true,
          content:
            "Developer: This action cannot be performed since there's no channel defined (FEEDBACK_CHANNEL_ID)",
        },
      };
    }

    return { ok: true };
  }

  async execute(
    interaction: DJS.CommandInteraction,
    lang: typeof import("@locales/english").default,
  ) {
    const feedback = interaction.options.getString("text", true);

    const embed = this.bot.utils
      .baseEmbed(interaction)
      .setTitle(lang.UTIL.NEW_FEEDBACK)
      .setDescription(feedback);

    const ch = this.bot.channels.cache.get(
      process.env["FEEDBACK_CHANNEL_ID"] as DJS.Snowflake,
    ) as DJS.TextChannel;

    await ch?.send({ embeds: [embed] });
    await interaction.reply({ ephemeral: true, content: lang.UTIL.FEEDBACK_SEND });
  }
}
