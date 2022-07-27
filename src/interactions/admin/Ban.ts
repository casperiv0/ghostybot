import * as DJS from "discord.js";
import { Bot } from "structures/Bot";
import { SubCommand } from "structures/Command/SubCommand";

export default class BanCommand extends SubCommand {
  constructor(bot: Bot) {
    super(bot, {
      commandName: "admin",
      name: "ban",
      description: "Ban a user from the current guild",
      botPermissions: [DJS.PermissionFlagsBits.BanMembers],
      memberPermissions: [DJS.PermissionFlagsBits.BanMembers],
      options: [
        {
          name: "user",
          description: "A user",
          type: DJS.ApplicationCommandOptionType.User,
          required: true,
        },
        {
          name: "reason",
          description: "The ban reason",
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

    if (!member || !this.bannable(member)) {
      return interaction.reply({
        ephemeral: true,
        content: lang.MEMBER.CANNOT_BE_BANNED,
      });
    }

    const me = this.bot.utils.getMe(interaction.guild);
    if ((me?.roles.highest.comparePositionTo(member.roles.highest) ?? 0) < 0) {
      return interaction.reply({
        ephemeral: true,
        content: this.bot.utils.translate(lang.ROLES.MY_ROLE_MUST_BE_HIGHER, {
          member: member.user.tag,
        }),
      });
    }

    await member.ban({
      deleteMessageDays: 7,
      reason: `${lang.ADMIN.BAN_BANNED_BY}: ${interaction.user.tag}\n**${lang.GLOBAL.REASON}:** ${reason}`,
    });

    try {
      await user.send({
        content: this.bot.utils.translate(lang.MEMBER.DM_BAN_MESSAGE, {
          guild_name: interaction.guild!.name,
          ban_reason: reason,
        }),
      });
      // eslint-disable-next-line no-empty
    } catch {}

    await interaction.reply({
      ephemeral: true,
      content: this.bot.utils.translate(lang.MEMBER.GUILD_BAN_MESSAGE, {
        member: user.username,
        ban_reason: reason,
      }),
    });
  }

  bannable(member: DJS.GuildMember) {
    if (member.bannable) return true;

    if (member.permissions.has(DJS.PermissionFlagsBits.BanMembers)) return false;
    if (member.permissions.has(DJS.PermissionFlagsBits.Administrator)) return false;

    return true;
  }
}
