import * as DJS from "discord.js";
import { Bot } from "structures/Bot";
import { SubCommand } from "structures/Command/SubCommand";

export default class WarningsCommand extends SubCommand {
  constructor(bot: Bot) {
    super(bot, {
      groupName: "warnings",
      commandName: "admin",
      name: "view",
      memberPermissions: [DJS.PermissionFlagsBits.ManageGuild],
      description: "View warnings of a user",
      options: [
        {
          name: "user",
          required: true,
          description: "The user you want to see their warnings of",
          type: DJS.ApplicationCommandOptionType.User,
        },
        {
          name: "warning-id",
          required: false,
          description: "The id of a warning",
          type: DJS.ApplicationCommandOptionType.Integer,
        },
      ],
    });
  }

  async execute(
    interaction: DJS.ChatInputCommandInteraction<"cached" | "raw">,
    lang: typeof import("@locales/english").default,
  ) {
    const user = interaction.options.getUser("user", true);
    const id = interaction.options.getInteger("warning-id");

    if (user.bot) {
      return interaction.reply({
        ephemeral: true,
        content: lang.MEMBER.BOT_DATA,
      });
    }

    const warnings = await this.bot.utils.getUserWarnings(user.id, interaction.guildId!);

    const embed = this.bot.utils.baseEmbed(interaction);

    if (id) {
      const warning = warnings[id - 1];

      if (!warning) {
        return interaction.reply({
          ephemeral: true,
          content: this.bot.utils.translate(lang.ADMIN.WARN_NOT_FOUND, { memberTag: user.tag }),
        });
      }

      const warnedOn = warning.date ? new Date(warning.date).toLocaleString() : "N/A";
      embed
        .setTitle(`${lang.ADMIN.WARNING} ${id}`)
        .addFields(
          { name: `**${lang.EVENTS.REASON}**`, value: warning.reason || lang.GLOBAL.NOT_SPECIFIED },
          { name: `**${lang.ADMIN.WARNED_ON}**`, value: warnedOn },
        );

      return interaction.reply({ ephemeral: true, embeds: [embed] });
    }

    embed
      .setTitle(this.bot.utils.translate(lang.ADMIN.MEMBER_WARNS, { memberTag: user.tag }))
      .addFields({
        name: `**${lang.ADMIN.TOTAL_WARNS}**`,
        value: (warnings.length || 0).toString(),
      })
      .setThumbnail(user.displayAvatarURL());

    await interaction.reply({ ephemeral: true, embeds: [embed] });
  }
}
