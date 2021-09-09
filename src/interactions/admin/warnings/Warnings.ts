import * as DJS from "discord.js";
import { Bot } from "structures/Bot";
import { SubCommand } from "structures/Command/SubCommand";

export default class WarningsCommand extends SubCommand {
  constructor(bot: Bot) {
    super(bot, {
      groupName: "warnings",
      commandName: "admin",
      name: "view",
      memberPermissions: [DJS.Permissions.FLAGS.MANAGE_GUILD],
      description: "View warnings of a user",
      options: [
        {
          name: "user",
          required: true,
          description: "The user you want to see their warnings of",
          type: "USER",
        },
        {
          name: "warning-id",
          required: false,
          description: "The id of a warning",
          type: "INTEGER",
        },
      ],
    });
  }

  async execute(
    interaction: DJS.CommandInteraction,
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
          content: lang.ADMIN.WARN_NOT_FOUND.replace("{memberTag}", user.tag),
        });
      }

      const warnedOn = warning?.date ? new Date(warning?.date)?.toLocaleString() : "N/A";
      embed
        .setTitle(`${lang.ADMIN.WARNING} ${id}`)
        .addField(`**${lang.EVENTS.REASON}**`, warning?.reason || lang.GLOBAL.NOT_SPECIFIED)
        .addField(`**${lang.ADMIN.WARNED_ON}**`, warnedOn);

      return interaction.reply({ ephemeral: true, embeds: [embed] });
    }

    embed
      .setTitle(lang.ADMIN.MEMBER_WARNS.replace("{memberTag}", user.tag))
      .addField(`**${lang.ADMIN.TOTAL_WARNS}**`, (warnings?.length || 0).toString())
      .setThumbnail(user.displayAvatarURL({ dynamic: true }));

    await interaction.reply({ ephemeral: true, embeds: [embed] });
  }
}
