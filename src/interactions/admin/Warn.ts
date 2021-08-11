import * as DJS from "discord.js";
import { Bot } from "structures/Bot";
import { ValidateReturn } from "structures/Command/Command";
import { SubCommand } from "structures/Command/SubCommand";

export default class WarnCommand extends SubCommand {
  constructor(bot: Bot) {
    super(bot, {
      commandName: "admin",
      name: "warn",
      description: "Warn a user",
      options: [
        {
          name: "user",
          description: "The user to warn",
          type: "USER",
          required: true,
        },
        {
          name: "reason",
          description: "The warn reason",
          type: "STRING",
          required: false,
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
    const reason = interaction.options.getString("reason") ?? lang.GLOBAL.NOT_SPECIFIED;
    const member = await this.bot.utils.findMember(interaction, [user.id]);

    if (!member) {
      return interaction.reply({
        ephemeral: true,
        content: lang.ADMIN.PROVIDE_VALID_MEMBER,
      });
    }

    if (member.user.bot) {
      return interaction.reply({
        ephemeral: true,
        content: lang.MEMBER.BOT_DATA,
      });
    }

    if (member.permissions.has("MANAGE_MESSAGES")) {
      return interaction.reply({
        ephemeral: true,
        content: lang.ADMIN.USER_NOT_WARN,
      });
    }

    await this.bot.utils.addWarning(member.user.id, interaction.guildId!, reason);

    const warnings = await this.bot.utils.getUserWarnings(member.user.id, interaction.guildId!);

    await interaction.reply({
      content: lang.ADMIN.USER_WARNED.replace("{memberTag}", member.user.tag)
        .replace("{reason}", reason)
        .replace("{warningsTotal}", warnings ? `${warnings.length}` : "0"),
    });
  }
}
