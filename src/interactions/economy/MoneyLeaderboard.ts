import { setTimeout } from "node:timers";
import * as DJS from "discord.js";
import { Bot } from "structures/Bot";
import { SubCommand } from "structures/Command/SubCommand";
import { prisma } from "utils/prisma";

import places from "assets/json/places.json";

export default class MoneyLeaderboardCommand extends SubCommand {
  constructor(bot: Bot) {
    super(bot, {
      commandName: "economy",
      name: "money-leaderboard",
      description: "See the money leaderboard",
    });
  }

  async execute(
    interaction: DJS.ChatInputCommandInteraction<"cached" | "raw">,
    lang: typeof import("@locales/english").default,
  ) {
    await interaction.deferReply();

    const data = (
      await prisma.users.findMany({
        where: { guild_id: interaction.guildId, OR: [{ bank: { gt: 0 } }, { money: { gt: 0 } }] },
      })
    )
      .sort((a, b) => b.bank + b.money - (a.bank + a.money))
      .splice(0, 10);

    const fields: DJS.APIEmbedField[] = [];
    const embed = this.bot.utils
      .baseEmbed(interaction)
      .setTitle(`${interaction.guild?.name} ${lang.ECONOMY.MONEY_LEADERBOARD}`)
      .setFooter({ text: lang.ECONOMY.BOTH_COUNTED });

    data.forEach(async (item, idx) => {
      const userId = item.user_id;
      const member = await this.bot.utils.findMember(interaction, [userId]);
      const isInPlace = [0, 1, 2].includes(idx);
      const total = item.bank + item.money;

      if (member) {
        fields.push({
          name: member.user.username,
          value: `${isInPlace ? places[idx] : ""} ${this.bot.utils.formatNumber(total)} ${
            lang.ECONOMY.TOTAL_BALANCE
          }`,
          inline: true,
        });
      }
    });

    await new Promise((resolve) => {
      setTimeout(resolve, 500);
    });

    await interaction.editReply({ embeds: [embed.addFields(fields)] });
  }
}
