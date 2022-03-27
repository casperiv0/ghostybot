import * as DJS from "discord.js";
import { Bot } from "structures/Bot";
import { SubCommand } from "structures/Command/SubCommand";
import UserModel, { IUser } from "models/User.model";
import places from "assets/json/places.json";

export default class LeaderboardCommand extends SubCommand {
  constructor(bot: Bot) {
    super(bot, {
      name: "leaderboard",
      commandName: "levels",
      description: "Shows top 10 users with the highest amount of XP",
    });
  }

  async execute(
    interaction: DJS.CommandInteraction,
    lang: typeof import("@locales/english").default,
  ) {
    await interaction.deferReply();

    const dbData = await UserModel.find({ guild_id: interaction.guildId!, xp: { $ne: 0 } });
    const sortedData = dbData.sort((a: IUser, b: IUser) => b.xp - a.xp).slice(0, 10);

    const embed = this.bot.utils
      .baseEmbed(interaction)
      .setTitle(`${interaction.guild?.name} ${lang.LEVELS.LEADERBOARD}`);

    for (let i = 0; i < sortedData.length; i++) {
      const user = sortedData[i];
      const member = await interaction.guild?.members.fetch(user.user_id).catch(() => null);

      if (member) {
        const isInPlace = [0, 1, 2].includes(i);
        const place = isInPlace ? places[i] : "";

        embed.addField(
          member.user.username,
          `${place} ${this.bot.utils.formatNumber(user.xp)}xp`,
          true,
        );
      }
    }

    await interaction.editReply({ embeds: [embed] });
  }
}
