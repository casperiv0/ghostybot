import * as DJS from "discord.js";
import { Bot } from "structures/Bot";
import { ValidateReturn } from "structures/Command/BaseCommand";
import { SubCommand } from "structures/Command/SubCommand";

export default class BugReportCommand extends SubCommand {
  constructor(bot: Bot) {
    super(bot, {
      commandName: "util",
      name: "bug-report",
      description: "Report a bug to the bot developer",
      options: [
        {
          name: "text",
          required: true,
          description: "The bug description",
          type: "STRING",
        },
      ],
    });
  }

  async validate(): Promise<ValidateReturn> {
    if (!process.env["BUG_REPORTS_CHANNEL_ID"]) {
      return {
        ok: false,
        error: {
          ephemeral: true,
          content:
            "Developer: This action cannot be performed since there's no channel defined (BUG_REPORTS_CHANNEL_ID)",
        },
      };
    }

    return { ok: true };
  }

  async execute(
    interaction: DJS.CommandInteraction,
    lang: typeof import("@locales/english").default,
  ) {
    const bug = interaction.options.getString("text", true);

    const embed = this.bot.utils
      .baseEmbed(interaction)
      .setTitle(lang.UTIL.BUG_REPORT.replace("{member}", interaction.user.tag))
      .setDescription(bug);

    const ch = this.bot.channels.cache.get(
      process.env["BUG_REPORTS_CHANNEL_ID"] as DJS.Snowflake,
    ) as DJS.TextChannel;

    await ch?.send({ embeds: [embed] });
    interaction.reply({ ephemeral: true, content: lang.UTIL.BUG_REPORTED });
  }
}
