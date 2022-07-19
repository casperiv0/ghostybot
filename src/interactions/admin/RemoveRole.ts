import * as DJS from "discord.js";
import { Bot } from "structures/Bot";
import { SubCommand } from "structures/Command/SubCommand";

export default class RemoveRoleCommand extends SubCommand {
  constructor(bot: Bot) {
    super(bot, {
      commandName: "admin",
      name: "remove-role",
      description: "Remove a role to a user",
      botPermissions: [DJS.PermissionFlagsBits.ManageRoles],
      memberPermissions: [DJS.PermissionFlagsBits.ManageRoles],
      options: [
        {
          name: "user",
          description: "The user",
          type: DJS.ApplicationCommandOptionType.User,
          required: true,
        },
        {
          name: "role",
          description: "The role you want to remove",
          type: DJS.ApplicationCommandOptionType.Role,
          required: true,
        },
      ],
    });
  }

  async execute(
    interaction: DJS.ChatInputCommandInteraction<"cached" | "raw">,
    lang: typeof import("@locales/english").default,
  ) {
    const me = this.bot.utils.getMe(interaction.guild);
    if (!me) return;

    const user = interaction.options.getUser("user", true);
    const role = interaction.options.getRole("role", true);

    const needsRole = await this.bot.utils.findMember(interaction, [user.id]);
    if (!needsRole) {
      return interaction.reply({
        content: lang.ADMIN.PROVIDE_VALID_MEMBER,
        ephemeral: true,
      });
    }

    if ((me?.roles.highest.comparePositionTo(role as DJS.Role) ?? 0) < 0) {
      return interaction.reply({
        ephemeral: true,
        content: this.bot.utils.translate(lang.ROLES.MY_ROLE_NOT_HIGH_ENOUGH, { role: role.name }),
      });
    }

    if ((me?.roles.highest.comparePositionTo(needsRole.roles.highest) ?? 0) < 0) {
      return interaction.reply({
        ephemeral: true,
        content: this.bot.utils.translate(lang.ROLES.MY_ROLE_MUST_BE_HIGHER, {
          member: user.username,
        }),
      });
    }

    await needsRole.roles.remove(role.id);

    await interaction.reply({
      ephemeral: true,
      content: this.bot.utils.translate(lang.ADMIN.REMOVED_ROLE, {
        roleName: role.name,
        needsRole: user.tag,
      }),
    });
  }
}
