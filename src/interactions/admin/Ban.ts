import * as DJS from "discord.js";
import { Bot } from "structures/Bot";
import { SubCommand } from "structures/Command/SubCommand";

export default class BanCommand extends SubCommand {
  constructor(bot: Bot) {
    super(bot, {
      commandName: "admin",
      name: "ban",
      description: "Ban a user from the current guild",
      botPermissions: [DJS.Permissions.FLAGS.BAN_MEMBERS],
      memberPermissions: [DJS.Permissions.FLAGS.BAN_MEMBERS],
      options: [
        {
          name: "user",
          description: "A user",
          type: "USER",
          required: true,
        },
        {
          name: "reason",
          description: "The ban reason",
          type: "STRING",
          required: false,
        },
      ],
    });
  }

  async execute(
    interaction: DJS.CommandInteraction,
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

    if (interaction.guild!.me!.roles.highest.comparePositionTo(member.roles.highest) < 0) {
      return interaction.reply({
        ephemeral: true,
        content: lang.ROLES.MY_ROLE_MUST_BE_HIGHER.replace("{member}", member.user?.tag),
      });
    }

    await member.ban({
      days: 7,
      reason: `${lang.ADMIN.BAN_BANNED_BY}: ${interaction.user.tag}\n**${lang.GLOBAL.REASON}:** ${reason}`,
    });

    try {
      await user.send({
        content: lang.MEMBER.DM_BAN_MESSAGE.replace(
          "{guild_name}",
          interaction.guild?.name!,
        ).replace("{ban_reason}", reason),
      });
      // eslint-disable-next-line no-empty
    } catch {}

    await interaction.reply({
      ephemeral: true,
      content: lang.MEMBER.GUILD_BAN_MESSAGE.replace("{member}", user.username).replace(
        "{ban_reason}",
        reason,
      ),
    });
  }

  bannable(member: DJS.GuildMember) {
    if (member.bannable) return true;

    if (member.permissions.has(DJS.Permissions.FLAGS.BAN_MEMBERS)) return false;
    if (member.permissions.has(DJS.Permissions.FLAGS.ADMINISTRATOR)) return false;

    return true;
  }
}
