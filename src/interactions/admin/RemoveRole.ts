import * as DJS from "discord.js";
import { Bot } from "structures/Bot";
import { SubCommand } from "structures/Command/SubCommand";

export default class RemoveRoleCommand extends SubCommand {
  constructor(bot: Bot) {
    super(bot, {
      commandName: "admin",
      name: "remove-role",
      description: "Remove a role to a user",
      botPermissions: [DJS.Permissions.FLAGS.MANAGE_ROLES],
      memberPermissions: [DJS.Permissions.FLAGS.MANAGE_ROLES],
      options: [
        {
          name: "user",
          description: "The user",
          type: "USER",
          required: true,
        },
        {
          name: "role",
          description: "The role you want to remove",
          type: "ROLE",
          required: true,
        },
      ],
    });
  }

  async execute(
    interaction: DJS.CommandInteraction,
    lang: typeof import("@locales/english").default,
  ) {
    if (!interaction.guild?.me) return;
    const user = interaction.options.getUser("user", true);
    const role = interaction.options.getRole("role", true);

    const needsRole = await this.bot.utils.findMember(interaction, [user.id]);
    if (!needsRole) {
      return interaction.reply({
        content: lang.ADMIN.PROVIDE_VALID_MEMBER,
        ephemeral: true,
      });
    }

    if (interaction.guild!.me!.roles.highest.comparePositionTo(role as DJS.Role) < 0) {
      return interaction.reply({
        ephemeral: true,
        content: lang.ROLES.MY_ROLE_NOT_HIGH_ENOUGH.replace("{role}", role.name),
      });
    }

    if (interaction.guild.me.roles.highest.comparePositionTo(needsRole.roles.highest) < 0) {
      return interaction.reply({
        ephemeral: true,
        content: lang.ROLES.MY_ROLE_MUST_BE_HIGHER.replace("{member}", user.username),
      });
    }

    await needsRole.roles.remove(role.id);

    await interaction.reply({
      ephemeral: true,
      content: lang.ADMIN.REMOVED_ROLE.replace("{roleName}", role.name).replace(
        "{needsRole}",
        `${user?.tag}`,
      ),
    });
  }
}
