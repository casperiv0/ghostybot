import * as DJS from "discord.js";
import { parse } from "twemoji-parser";
import { Bot } from "structures/Bot";
import { SubCommand } from "structures/Command/SubCommand";

export default class EnlargeCommand extends SubCommand {
  constructor(bot: Bot) {
    super(bot, {
      commandName: "util",
      name: "enlarge",
      description: "Enlarge an emoji",
      options: [
        {
          name: "emoji",
          type: "STRING",
          required: true,
          description: "The emoji you want to enlarge",
        },
      ],
    });
  }

  async execute(
    interaction: DJS.CommandInteraction,
    lang: typeof import("@locales/english").default,
  ) {
    const emoji = interaction.options.getString("emoji", true);
    const custom = DJS.Util.parseEmoji(emoji);

    const embed = this.bot.utils
      .baseEmbed(interaction)
      .setTitle(lang.UTIL.ENLARGED_EMOJI.replace("{emoji}", emoji));

    if (custom?.id) {
      embed.setImage(
        `https://cdn.discordapp.com/emojis/${custom.id}.${custom?.animated ? "gif" : "png"}`,
      );

      return interaction.reply({ embeds: [embed] });
    }

    const [parsed] = parse(emoji, { assetType: "png" });
    if (!parsed) {
      return interaction.reply({ ephemeral: true, content: lang.UTIL.INVALID_EMOJI });
    }

    embed.setImage(parsed.url);

    await interaction.reply({ embeds: [embed] });
  }
}
