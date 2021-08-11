import * as DJS from "discord.js";
import { Bot } from "structures/Bot";
import { ValidateReturn } from "structures/Command/Command";
import { SubCommand } from "structures/Command/SubCommand";

export default class ReRollGiveaway extends SubCommand {
  constructor(bot: Bot) {
    super(bot, {
      commandName: "giveaway",
      name: "reroll",
      description: "Re-roll a giveaway",
      options: [
        {
          description: "The messageId of the giveaway",
          name: "message-id",
          required: true,
          type: "STRING",
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
    const messageId = interaction.options.getString("message-id", true) as DJS.Snowflake;

    const deleted = await this.bot.giveawayManager.delete(messageId).catch(() => null);

    if (deleted === null) {
      return interaction.reply({
        ephemeral: true,
        content: lang.GIVEAWAY.ALREADY_ENDED,
      });
    }

    await interaction.reply({ ephemeral: true, content: lang.GIVEAWAY.SUCCESS_ENDED });
  }
}
