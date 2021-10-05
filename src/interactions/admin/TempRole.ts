import * as DJS from "discord.js";
import ms from "ms";
import { Bot } from "structures/Bot";
import { SubCommand } from "structures/Command/SubCommand";

export default class TempRoleCommand extends SubCommand {
  constructor(bot: Bot) {
    super(bot, {
      commandName: "admin",
      name: "temp-role",
      description: "Give someone a role for a period of time",
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
        {
          name: "time",
          description: "The amount of time (Eg: 2d, 40h, 10min, etc.)",
          type: "STRING",
          required: true,
        },
      ],
    });
  }

  async execute(
    interaction: DJS.CommandInteraction,
    lang: typeof import("@locales/english").default,
  ) {
    const user = interaction.options.getUser("user", true);
    const role = interaction.options.getRole("role", true);
    const time = interaction.options.getString("time", true);
    // @ts-expect-error ignore
    const parsedRole = new DJS.Role(this.bot, role as any, interaction.guild!);

    const needsRole = await this.bot.utils.findMember(interaction, [user.id]);

    if (!needsRole) {
      return interaction.reply({
        ephemeral: true,
        content: lang.MEMBER.NOT_FOUND,
      });
    }

    if (interaction.guild!.me!.roles.highest.comparePositionTo(parsedRole) < 0) {
      return interaction.reply({
        ephemeral: true,
        content: lang.ROLES.MY_ROLE_NOT_HIGH_ENOUGH.replace("{role}", role.name),
      });
    }

    if (interaction.guild!.me!.roles.highest.comparePositionTo(needsRole.roles.highest) < 0) {
      return interaction.reply({
        ephemeral: true,
        content: lang.ROLES.MY_ROLE_MUST_BE_HIGHER.replace("{member}", needsRole.user.username),
      });
    }

    if (needsRole.roles.cache.some((r) => role.id === r.id)) {
      return interaction.reply({
        ephemeral: true,
        content: lang.ROLES.ALREADY_HAS_ROLE,
      });
    }

    needsRole.roles.add(parsedRole);

    const dbUser = await this.bot.utils.getUserById(user.id, interaction.guildId!);

    await this.bot.utils.updateUserById(needsRole.user.id, interaction.guildId!, {
      temproles: {
        hasTempRoles: true,
        tempRoles: [
          ...(dbUser?.temproles.tempRoles ?? []),
          {
            roleId: role.id,
            ms: Date.now() + ms(time),
          },
        ],
      },
    });

    await interaction.reply({
      content: lang.ADMIN.ADDED_ROLE_TO.replace("{roleName}", role.name)
        .replace("{time}", time)
        .replace("{userTag}", needsRole.user.tag),
    });
  }
}
