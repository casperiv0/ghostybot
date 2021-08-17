import * as DJS from "discord.js";
import { Bot } from "structures/Bot";
import { SubCommand } from "structures/Command/SubCommand";

export default class AFKCommand extends SubCommand {
  constructor(bot: Bot) {
    super(bot, {
      commandName: "util",
      name: "afk",
      description: "Set yourself to afk/not-afk",
      options: [
        {
          name: "reason",
          type: "STRING",
          required: false,
          description: "The reason why you're going afk",
        },
      ],
    });
  }

  async execute(
    interaction: DJS.CommandInteraction,
    lang: typeof import("@locales/english").default,
  ) {
    const guildId = interaction.guild?.id;
    const userId = interaction.user.id;
    const user = await this.bot.utils.getUserById(userId, guildId);

    if (user?.afk?.is_afk) {
      await this.bot.utils.updateUserById(userId, guildId, {
        afk: { is_afk: false, reason: null },
      });

      const embed = this.bot.utils
        .baseEmbed(interaction)
        .setTitle(lang.GLOBAL.SUCCESS)
        .setDescription(lang.UTIL.NOT_AFK);

      return interaction.reply({ embeds: [embed] });
    }

    const reason = interaction.options.getString("reason") ?? lang.GLOBAL.NOT_SPECIFIED;

    await this.bot.utils.updateUserById(userId, guildId, {
      afk: { is_afk: true, reason },
    });

    const embed = this.bot.utils
      .baseEmbed(interaction)
      .setTitle(lang.GLOBAL.SUCCESS)
      .setDescription(`${lang.UTIL.AFK}\n**${lang.GLOBAL.REASON}:** ${reason}`);

    await interaction.reply({ embeds: [embed] });
  }
}
