import * as DJS from "discord.js";
import { Bot } from "structures/Bot";
import { SubCommand } from "structures/Command/SubCommand";

export default class AddRoleCommand extends SubCommand {
  constructor(bot: Bot) {
    super(bot, {
      commandName: "admin",
      name: "add-role",
      description: "Add a role to a user",
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
          description: "The role you want to add",
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
        content: lang.GLOBAL.ERROR,
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

    if (needsRole.roles.cache.some((r) => role.id === r.id)) {
      return interaction.reply({
        ephemeral: true,
        content: lang.ROLES.ALREADY_HAS_ROLE,
      });
    }

    await interaction.reply({
      ephemeral: true,
      content: lang.ROLES.ADDED_ROLE_TO.replace("{role}", role.name).replace(
        "{member}",
        user.username,
      ),
    });

    await needsRole.roles.add(role.id);
  }
}
