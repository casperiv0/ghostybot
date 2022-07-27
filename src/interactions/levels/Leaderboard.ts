import * as DJS from "discord.js";
import { Bot } from "structures/Bot";
import { SubCommand } from "structures/Command/SubCommand";
import places from "assets/json/places.json";
import { prisma } from "utils/prisma";

export default class LeaderboardCommand extends SubCommand {
  constructor(bot: Bot) {
    super(bot, {
      name: "leaderboard",
      commandName: "levels",
      description: "Shows top 10 users with the highest amount of XP",
    });
  }

  async execute(
    interaction: DJS.ChatInputCommandInteraction<"cached" | "raw">,
    lang: typeof import("@locales/english").default,
  ) {
    await interaction.deferReply();

    const data = (
      await prisma.users.findMany({
        where: { guild_id: interaction.guildId, xp: { gt: 0 } },
      })
    )
      .sort((a, b) => b.xp - a.xp)
      .slice(0, 10);

    const fields: DJS.APIEmbedField[] = [];
    const embed = this.bot.utils
      .baseEmbed(interaction)
      .setTitle(`${interaction.guild?.name} ${lang.LEVELS.LEADERBOARD}`);

    for (let i = 0; i < data.length; i++) {
      const user = data[i];
      const member = await interaction.guild?.members.fetch(user.user_id).catch(() => null);

      if (member) {
        const isInPlace = [0, 1, 2].includes(i);
        const place = isInPlace ? places[i] : "";

        fields.push({
          name: member.user.username,
          value: `${place} ${this.bot.utils.formatNumber(user.xp)}xp`,
          inline: true,
        });
      }
    }

    await interaction.editReply({ embeds: [embed] });
  }
}
