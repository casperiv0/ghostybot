import * as DJS from "discord.js";
import { Bot } from "structures/Bot";
import UserModel, { IUser } from "models/User.model";
import places from "assets/json/places.json";

export async function leaderboard(
  bot: Bot,
  interaction: DJS.CommandInteraction,
  lang: typeof import("@locales/english").default,
) {
  await interaction.deferReply();

  const data = (await UserModel.find({ guild_id: interaction.guildId! }))
    .sort((a: IUser, b: IUser) => b.xp - a.xp)
    .splice(0, 10);

  const embed = bot.utils
    .baseEmbed(interaction)
    .setTitle(`${interaction.guild?.name} ${lang.LEVELS.LEADERBOARD}`);

  await Promise.all(
    data.map(async (item: IUser, idx: number) => {
      const userId = item.user_id;
      const member = await bot.utils.findMember(interaction, [userId]);
      const isInPlace = [0, 1, 2].includes(idx);

      if (member) {
        embed.addField(
          member.user.username,
          `${isInPlace ? places[idx] : ""} ${bot.utils.formatNumber(data[idx].xp)}xp`,
          true,
        );
      }
    }),
  );

  await interaction.editReply({ embeds: [embed] });
}
