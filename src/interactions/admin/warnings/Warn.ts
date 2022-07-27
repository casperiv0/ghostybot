import * as DJS from "discord.js";
import { Bot } from "structures/Bot";
import { SubCommand } from "structures/Command/SubCommand";
import { prisma } from "utils/prisma";

export default class WarnCommand extends SubCommand {
  constructor(bot: Bot) {
    super(bot, {
      commandName: "admin",
      name: "warn",
      description: "Warn a user",
      memberPermissions: [DJS.PermissionFlagsBits.ManageGuild],
      options: [
        {
          name: "user",
          description: "The user to warn",
          type: DJS.ApplicationCommandOptionType.User,
          required: true,
        },
        {
          name: "reason",
          description: "The warn reason",
          type: DJS.ApplicationCommandOptionType.String,
          required: false,
        },
      ],
    });
  }

  async execute(
    interaction: DJS.ChatInputCommandInteraction<"cached" | "raw">,
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

    if (member.permissions.has(DJS.PermissionFlagsBits.ManageMessages)) {
      return interaction.reply({
        ephemeral: true,
        content: lang.ADMIN.USER_NOT_WARN,
      });
    }

    await prisma.warnings.create({
      data: {
        guild_id: interaction.guildId,
        user_id: interaction.user.id,
        reason,
        date: Date.now(),
      },
    });

    const warnings = await this.bot.utils.getUserWarnings(member.user.id, interaction.guildId!);

    await interaction.reply({
      content: this.bot.utils.translate(lang.ADMIN.USER_WARNED, {
        memberTag: member.user.tag,
        reason,
        warningsTotal: warnings ? warnings.length : 0,
      }),
    });
  }
}
