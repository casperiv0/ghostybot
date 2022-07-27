import * as DJS from "discord.js";
import { Bot } from "structures/Bot";
import { SubCommand } from "structures/Command/SubCommand";

export default class KickCommand extends SubCommand {
  constructor(bot: Bot) {
    super(bot, {
      commandName: "admin",
      name: "kick",
      description: "Kick a user from the current guild",
      botPermissions: [DJS.PermissionFlagsBits.KickMembers],
      memberPermissions: [DJS.PermissionFlagsBits.KickMembers],
      options: [
        {
          name: "user",
          description: "A user",
          type: DJS.ApplicationCommandOptionType.User,
          required: true,
        },
        {
          name: "reason",
          description: "The kick reason",
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
    const me = this.bot.utils.getMe(interaction.guild);
    if (!me) return;

    const user = interaction.options.getUser("user", true);
    const reason = interaction.options.getString("reason") ?? lang.GLOBAL.NOT_SPECIFIED;

    const member = await this.bot.utils.findMember(interaction, [user.id]);

    if (!member || !this.kickable(member)) {
      return interaction.reply({
        ephemeral: true,
        content: lang.ADMIN.KICK_CANNOT_KICK,
      });
    }

    if ((me?.roles.highest.comparePositionTo(member.roles.highest) ?? 0) < 0) {
      return interaction.reply({
        ephemeral: true,
        content: this.bot.utils.translate(lang.ROLES.MY_ROLE_MUST_BE_HIGHER, { member: user.tag }),
      });
    }

    await member.kick(reason);

    try {
      await user.send({
        content: this.bot.utils.translate(lang.ADMIN.KICK_SUCCESS_DM, {
          guild_name: interaction.guild!.name,
          ban_reason: reason,
        }),
      });
      // eslint-disable-next-line no-empty
    } catch {}

    await interaction.reply({
      ephemeral: true,
      content: this.bot.utils.translate(lang.ADMIN.KICK_SUCCESS, {
        ban_reason: reason,
        tag: user.tag,
      }),
    });

    this.bot.emit("guildKickAdd", interaction.guild, {
      member,
      executor: interaction.user,
      reason,
    });
  }

  kickable(member: DJS.GuildMember) {
    if (member.kickable) return true;

    if (member.permissions.has(DJS.PermissionFlagsBits.KickMembers)) return false;
    if (member.permissions.has(DJS.PermissionFlagsBits.Administrator)) return false;

    return true;
  }
}
