import * as DJS from "discord.js";
import { request } from "undici";
import { Bot } from "structures/Bot";
import { Command } from "structures/Command/Command";

export default class MDNInteraction extends Command {
  constructor(bot: Bot) {
    super(bot, {
      name: "mdn",
      description: "Find something on the MDN Web Docs.",
      options: [
        {
          name: "query",
          description: "What do you want to search for",
          type: DJS.ApplicationCommandOptionType.String,
          required: true,
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

      const url = `${this.APIs.MDN}${query}`;
      const data = await request(url).then((res) => res.body.json());

      if (!data || data?.message || data?.code) {
        return interaction.editReply({ content: lang.UTIL.MDN_NOT_FOUND });
      }

      const embed = new DJS.EmbedBuilder({
        ...data,
        color: "#5865f2",
        footer: {
          text: interaction.user.username,
          icon_url: interaction.user.displayAvatarURL(),
        },
      });

      return interaction.editReply({ embeds: [embed] });
    } catch (err) {
      this.bot.utils.sendErrorLog(err, "error");
      return interaction.editReply({ content: lang.GLOBAL.ERROR });
    }
  }
}
