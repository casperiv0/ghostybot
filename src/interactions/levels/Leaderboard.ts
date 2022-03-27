import * as DJS from "discord.js";
import { Bot } from "structures/Bot";
import { SubCommand } from "structures/Command/SubCommand";
import UserModel, { IUser } from "models/User.model";
import places from "assets/json/places.json";

export default class GiveXP extends SubCommand {
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

    const data = (await UserModel.find({ guild_id: interaction.guildId!, xp: { $ne: 0 } })).sort(
      (a: IUser, b: IUser) => b.xp - a.xp,
    );

    const embed = this.bot.utils
      .baseEmbed(interaction)
      .setTitle(`${interaction.guild?.name} ${lang.LEVELS.LEADERBOARD}`);

    let idx = 0;
    for (const user of data) {
      const member = await interaction.guild?.members.fetch(user.user_id).catch(() => null);

      if (member) {
        const isInPlace = [0, 1, 2].includes(idx);

        embed.addField(
          member.user.username,
          `${isInPlace ? places[idx] : ""} ${this.bot.utils.formatNumber(user.xp)}xp`,
          true,
        );

        ++idx;
      }

      if (idx === data.slice(0, 10).length - 1) break;
    }

    await interaction.editReply({ embeds: [embed] });
  }
}
