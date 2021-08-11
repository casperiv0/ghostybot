import * as DJS from "discord.js";
import { Bot } from "structures/Bot";
import { ValidateReturn } from "structures/Command/Command";
import { SubCommand } from "structures/Command/SubCommand";

export default class UnbanCommand extends SubCommand {
  constructor(bot: Bot) {
    super(bot, {
      commandName: "admin",
      name: "unban",
      description: "Unban a member from the current guild",
      options: [
        {
          name: "user-id",
          type: "STRING",
          required: true,
          description: "The user id of the banned member",
        },
      ],
    });
  }

  async validate(
    interaction: DJS.CommandInteraction,
    lang: typeof import("@locales/english").default,
  ): Promise<ValidateReturn> {
    const perms = this.bot.utils.formatMemberPermissions(
      [DJS.Permissions.FLAGS.BAN_MEMBERS],
      interaction,
      lang,
    );

    if (perms) {
      return { ok: false, error: { content: perms, ephemeral: true } };
    }

    const botPerms = this.bot.utils.formatBotPermissions(
      [DJS.Permissions.FLAGS.BAN_MEMBERS],
      interaction,
      lang,
    );

    if (botPerms) {
      return { ok: false, error: { embeds: [botPerms], ephemeral: true } };
    }

    return { ok: true };
  }

  async execute(
    interaction: DJS.CommandInteraction,
    lang: typeof import("@locales/english").default,
  ) {
    const userId = interaction.options.getString("user-id", true);

    const bannedUser = await interaction.guild?.members.unban(userId as DJS.Snowflake);

    await interaction.reply({
      ephemeral: true,
      content: lang.ADMIN.SUC_UNBAN.replace("{bannedUsername}", `${bannedUser?.username}`),
    });
  }
}
