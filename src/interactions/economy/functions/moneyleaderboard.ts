import * as DJS from "discord.js";
import Bot from "structures/Bot";
import UserModel, { IUser } from "models/User.model";
import places from "assets/json/places.json";

export async function moneyLeaderboard(
  bot: Bot,
  interaction: DJS.CommandInteraction,
  lang: typeof import("@locales/english").default,
) {
  await interaction.deferReply();

  const data = (await UserModel.find({ guild_id: interaction.guildId! }))
    .map((v: IUser) => {
      return { total: v.money + v.bank, ...v.toJSON() };
    })
    .sort((a, b) => b.total - a.total)
    .splice(0, 10);

  const embed = bot.utils
    .baseEmbed(interaction)
    .setTitle(`${interaction.guild?.name} ${lang.ECONOMY.MONEY_LEADERBOARD}`)
    .setFooter(lang.ECONOMY.BOTH_COUNTED);

  data.forEach(async (item, idx) => {
    const userId = item.user_id;
    const member = await bot.utils.findMember(interaction, [userId]);
    const isInPlace = [0, 1, 2].includes(idx);

    if (member) {
      embed.addField(
        member.user.username,
        `${isInPlace ? places[idx] : ""} ${bot.utils.formatNumber(data[idx].total)} ${
          lang.ECONOMY.TOTAL_BALANCE
        }`,
        true,
      );
    }
  });

  await new Promise((resolve) => {
    setTimeout(resolve, 500);
  });

  interaction.editReply({ embeds: [embed] });
}
