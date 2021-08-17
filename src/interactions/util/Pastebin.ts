import * as DJS from "discord.js";
import { ApiPasteFormat, ExpireDate } from "pastebin-api";
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
          type: "STRING",
        },
        {
          name: "extension",
          required: false,
          description: "The file extension",
          type: "STRING",
        },
        {
          name: "filename",
          required: false,
          description: "This will be the name of the paste",
          type: "STRING",
        },
        {
          type: "STRING",
          name: "expire-date",
          required: false,
          description: "When the paste will expire",
          choices: [
            {
              name: "Never",
              value: "N",
            },
            {
              name: "10 Minutes",
              value: "10M",
            },
            {
              name: "1 Hour",
              value: "1H",
            },
            {
              name: "1 Week",
              value: "1W",
            },
            {
              name: "2 Weeks",
              value: "2W",
            },
            {
              name: "1 Month",
              value: "1M",
            },
            {
              name: "6 Months",
              value: "6M",
            },
            {
              name: "1 Year",
              value: "1Y",
            },
          ],
        },
      ],
    });
  }

  async execute(
    interaction: DJS.CommandInteraction,
    lang: typeof import("@locales/english").default,
  ) {
    const code = interaction.options.getString("code", true);
    const extension = interaction.options.getString("extension");
    const expireDate = interaction.options.getString("expire-date") ?? "N";
    const name = interaction.options.getString("filename") ?? "unknown";

    const pasteUrl = await this.bot.pasteClient
      .createPaste({
        code,
        expireDate: expireDate as ExpireDate,
        publicity: 1,
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
