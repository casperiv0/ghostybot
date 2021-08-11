import * as DJS from "discord.js";
import WarningModel from "models/Warning.model";
import { Bot } from "structures/Bot";
import { ValidateReturn } from "structures/Command/Command";
import { SubCommand } from "structures/Command/SubCommand";

export default class RemoveWarningCommand extends SubCommand {
  constructor(bot: Bot) {
    super(bot, {
      commandName: "admin",
      groupName: "warnings",
      name: "remove",
      description: "Remove a warning from a user",
      options: [
        {
          name: "user",
          required: true,
          description: "The user you want to remove a warning of",
          type: "USER",
        },
        {
          name: "warning-id",
          required: true,
          description: "The id of a warning",
          type: "NUMBER",
        },
      ],
    });
  }

  async validate(
    interaction: DJS.CommandInteraction,
    lang: typeof import("@locales/english").default,
  ): Promise<ValidateReturn> {
    const perms = this.bot.utils.formatMemberPermissions(
      [DJS.Permissions.FLAGS.MANAGE_GUILD],
      interaction,
      lang,
    );

    if (perms) {
      return { ok: false, error: { content: perms, ephemeral: true } };
    }

    return { ok: true };
  }

  async execute(
    interaction: DJS.CommandInteraction,
    lang: typeof import("@locales/english").default,
  ) {
    const user = interaction.options.getUser("user", true);
    const id = interaction.options.getNumber("warning-id", true);

    if (user.bot) {
      return interaction.reply({
        ephemeral: true,
        content: lang.MEMBER.BOT_DATA,
      });
    }

    await interaction.deferReply({ ephemeral: true });

    const warnings = await this.bot.utils.getUserWarnings(user.id, interaction.guildId!);

    if (!warnings[0]) {
      return interaction.reply({
        content: lang.ADMIN.NO_WARNINGS,
      });
    }

    const warning = warnings[id - 1];

    if (!warning) {
      return interaction.editReply({
        content: "That warning was not found",
      });
    }

    await WarningModel.findByIdAndDelete(warning._id).catch(() => null);

    await interaction.editReply({ content: lang.ADMIN.REMOVED_ALL_WARNINGS });
  }
}
