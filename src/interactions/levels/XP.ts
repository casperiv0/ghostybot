import * as DJS from "discord.js";
import { Bot } from "structures/Bot";
import { SubCommand } from "structures/Command/SubCommand";

export default class GiveXP extends SubCommand {
  constructor(bot: Bot) {
    super(bot, {
      name: "xp",
      commandName: "levels",
      description: "Get the xp of a user or yourself",
      options: [
        {
          name: "user",
          description: "A user",
          type: "USER",
          required: false,
        },
      ],
    });
  }

  async execute(
    interaction: DJS.CommandInteraction,
    lang: typeof import("@locales/english").default,
  ) {
    const user = interaction.options.getUser("user") ?? interaction.user;
    if (user.bot) {
      return interaction.reply({ ephemeral: true, content: lang.MEMBER.BOT_DATA });
    }

    const dbUser = await this.bot.utils.getUserById(user.id, interaction.guildId!);
    if (!dbUser) {
      return interaction.reply({ ephemeral: true, content: lang.GLOBAL.ERROR });
    }

    const embed = this.bot.utils
      .baseEmbed(interaction)
      .setTitle(`${user.username} ${lang.LEVELS.XP}`)
      .setDescription(`${lang.LEVELS.XP}: ${this.bot.utils.formatNumber(dbUser.xp)}`);

    await interaction.reply({
      embeds: [embed],
    });
  }
}
