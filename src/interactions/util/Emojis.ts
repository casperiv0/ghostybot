import * as DJS from "discord.js";
import { Bot } from "structures/Bot";
import { SubCommand } from "structures/Command/SubCommand";

interface Field {
  name: string;
  value: string;
}

export default class EmojisCommand extends SubCommand {
  constructor(bot: Bot) {
    super(bot, {
      commandName: "util",
      name: "emojis",
      description: "View all emojis in this guild",
    });
  }

  async execute(
    interaction: DJS.CommandInteraction,
    lang: typeof import("@locales/english").default,
  ) {
    const nonAnimated: string[] = [];
    const animated: string[] = [];
    const emojis = interaction.guild?.emojis.cache ?? new DJS.Collection();

    if (emojis?.size <= 0) {
      return interaction.reply({ ephemeral: true, content: "This guild does not have any emojis" });
    }

    emojis.forEach((e) => {
      if (e.animated) animated.push(e.toString());
      else nonAnimated.push(e.toString());
    });

    const embed = this.bot.utils.baseEmbed(interaction);
    const fields: Field[] = [];

    for (let i = 0; i < nonAnimated.length; i++) {
      if (i % 20 === 0) {
        const emojis = nonAnimated.slice(i, i + 20);

        fields.push({ name: lang.UTIL.NON_ANIMATED, value: emojis.join(" ") });
      }
    }

    for (let i = 0; i < animated.length; i++) {
      if (i % 20 === 0) {
        const emojis = animated.slice(i, i + 20);

        fields.push({ name: lang.UTIL.ANIMATED, value: emojis.join(" ") });
      }
    }

    embed.addFields(fields);

    await interaction.reply({ embeds: [embed] });
  }
}
