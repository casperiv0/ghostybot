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
          description: "The role you want to add",
          type: DJS.ApplicationCommandOptionType.Role,
          required: true,
        },
        {
          name: "time",
          description: "The amount of time (Eg: 2d, 40h, 10min, etc.)",
          type: DJS.ApplicationCommandOptionType.String,
          required: true,
        },
      ],
    });
  }

  async execute(
    interaction: DJS.ChatInputCommandInteraction<"cached" | "raw">,
    lang: typeof import("@locales/english").default,
  ) {
    const user = interaction.options.getUser("user", true);
    const role = interaction.options.getRole("role", true);
    const time = interaction.options.getString("time", true);
    // @ts-expect-error ignore
    const parsedRole = new DJS.Role(this.bot, role, interaction.guild!);

    const needsRole = await this.bot.utils.findMember(interaction, [user.id]);

    if (!needsRole) {
      return interaction.reply({
        ephemeral: true,
        content: lang.MEMBER.NOT_FOUND,
      });
    }

    const me = this.bot.utils.getMe(interaction.guild);
    if ((me?.roles.highest.comparePositionTo(parsedRole) ?? 0) < 0) {
      return interaction.reply({
        ephemeral: true,
        content: this.bot.utils.translate(lang.ROLES.MY_ROLE_NOT_HIGH_ENOUGH, { role: role.name }),
      });
    }

    if ((me?.roles.highest.comparePositionTo(needsRole.roles.highest) ?? 0) < 0) {
      return interaction.reply({
        ephemeral: true,
        content: this.bot.utils.translate(lang.ROLES.MY_ROLE_MUST_BE_HIGHER, {
          member: needsRole.user.username,
        }),
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
          ...(dbUser?.temproles?.tempRoles ?? []),
          {
            roleId: role.id,
            ms: Date.now() + ms(time),
          },
        ],
      },
    });

    await interaction.reply({
      content: this.bot.utils.translate(lang.ADMIN.ADDED_ROLE_TO, {
        roleName: role.name,
        time,
        userTag: needsRole.user.tag,
      }),
    });
  }
}
