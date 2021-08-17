import * as DJS from "discord.js";
import { Bot } from "structures/Bot";
import { SubCommand } from "structures/Command/SubCommand";

export default class CtgsCommand extends SubCommand {
  constructor(bot: Bot) {
    super(bot, {
      commandName: "util",
      name: "ctgs",
      description: "Create a shortened URL (ctgs.ga)",
      options: [
        {
          name: "slug",
          required: true,
          description: "The slug, the part after the domain",
          type: "STRING",
        },
        {
          name: "url",
          required: true,
          description: "The URL where it should be redirected to",
          type: "STRING",
        },
      ],
    });
  }

  async execute(interaction: DJS.CommandInteraction) {
    const slug = interaction.options.getString("slug", true);
    const url = interaction.options.getString("url", true);
    const data = await this.bot.ctgs.new(slug, url).catch((e) => e?.message ?? e);

    await interaction.reply({ content: data });
  }
}
