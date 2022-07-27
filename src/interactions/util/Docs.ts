import * as DJS from "discord.js";
import { request } from "undici";
import { Bot } from "structures/Bot";
import { Command } from "structures/Command/Command";

export default class DocsInteraction extends Command {
  constructor(bot: Bot) {
    super(bot, {
      name: "docs",
      description: "Find something on the discord.js docs",
      options: [
        {
          name: "query",
          description: "What do you want to search for",
          type: DJS.ApplicationCommandOptionType.String,
          required: true,
        },
        {
          name: "branch",
          description: "The branch",
          type: DJS.ApplicationCommandOptionType.String,
          required: false,
          choices: [
            {
              name: "Stable",
              value: "stable",
            },
            {
              name: "Master",
              value: "master",
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
    try {
      await interaction.deferReply();
      const query = interaction.options.getString("query", true);
      const branch = interaction.options.getString("branch") ?? "stable";

      const url = `${this.APIs.Docs}${branch}&q=${query}`;
      const data = await request(url).then((res) => res.body.json());

      if (!data || data?.message || data?.error) {
        return interaction.editReply({ content: lang.UTIL.DOC_NOT_FOUND });
      }

      const embed = new DJS.EmbedBuilder({
        ...data,
        color: "#5865f2",
        footer: {
          text: interaction.user.username,
          icon_url: interaction.user.displayAvatarURL(),
        },
      });

      await interaction.editReply({ embeds: [embed] });
    } catch (err) {
      this.bot.utils.sendErrorLog(err, "error");
      return interaction.editReply({ content: lang.GLOBAL.ERROR });
    }
  }
}
