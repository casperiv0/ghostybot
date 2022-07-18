import * as DJS from "discord.js";
import { ApiPasteFormat, ExpireDate, Publicity } from "pastebin-api";
import { Bot } from "structures/Bot";
import { SubCommand } from "structures/Command/SubCommand";

export default class PastebinCommand extends SubCommand {
  constructor(bot: Bot) {
    super(bot, {
      commandName: "util",
      name: "pastebin",
      description: "Create a paste (pastebin.com)",
      options: [
        {
          name: "code",
          required: true,
          description: "This will be the paste code",
          type: DJS.ApplicationCommandOptionType.String,
        },
        {
          name: "extension",
          required: false,
          description: "The file extension",
          type: DJS.ApplicationCommandOptionType.String,
        },
        {
          name: "filename",
          required: false,
          description: "This will be the name of the paste",
          type: DJS.ApplicationCommandOptionType.String,
        },
        {
          type: DJS.ApplicationCommandOptionType.String,
          name: "expire-date",
          required: false,
          description: "When the paste will expire",
          choices: [
            {
              name: "Never",
              value: ExpireDate.Never,
            },
            {
              name: "10 Minutes",
              value: ExpireDate.TenMinutes,
            },
            {
              name: "1 Hour",
              value: ExpireDate.OneHour,
            },
            {
              name: "1 Week",
              value: ExpireDate.OneWeek,
            },
            {
              name: "2 Weeks",
              value: ExpireDate.TwoWeeks,
            },
            {
              name: "1 Month",
              value: ExpireDate.OneMonth,
            },
            {
              name: "6 Months",
              value: ExpireDate.SixMonths,
            },
            {
              name: "1 Year",
              value: ExpireDate.OneYear,
            },
          ],
        },
      ],
    });
  }

  async execute(
    interaction: DJS.ChatInputCommandInteraction<"cached" | "raw">,
    lang: typeof import("@locales/english").default,
  ) {
    const code = interaction.options.getString("code", true);
    const extension = interaction.options.getString("extension");
    const expireDate =
      (interaction.options.getString("expire-date") as ExpireDate | null) ?? ExpireDate.Never;
    const name = interaction.options.getString("filename") ?? "unknown";

    const pasteUrl = await this.bot.pasteClient
      .createPaste({
        code,
        expireDate,
        publicity: Publicity.Unlisted,
        format: (extension as ApiPasteFormat) ?? undefined,
        name,
      })
      .catch((e) => e.message);

    if (pasteUrl.startsWith("Bad API request, invalid api_paste_format")) {
      return interaction.reply({
        ephemeral: true,
        content: lang.UTIL.PASTE_INVALID_FORMAT,
      });
    }

    await interaction.reply({ content: pasteUrl });
  }
}
