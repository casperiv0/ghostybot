import * as DJS from "discord.js";
import { Bot } from "structures/Bot";
import { SubCommand } from "structures/Command/SubCommand";

export default class KickCommand extends SubCommand {
  constructor(bot: Bot) {
    super(bot, {
      commandName: "admin",
      name: "kick",
      description: "Kick a user from the current guild",
      botPermissions: [DJS.Permissions.FLAGS.KICK_MEMBERS],
      memberPermissions: [DJS.Permissions.FLAGS.KICK_MEMBERS],
      options: [
        {
          name: "user",
          description: "A user",
          type: "USER",
          required: true,
        },
        {
          name: "reason",
          description: "The kick reason",
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

    if (!member || !this.kickable(member)) {
      return interaction.reply({
        ephemeral: true,
        content: lang.ADMIN.KICK_CANNOT_KICK,
      });
    }

    if (interaction.guild!.me!.roles.highest.comparePositionTo(member.roles.highest) < 0) {
      return interaction.reply({
        ephemeral: true,
        content: lang.ROLES.MY_ROLE_MUST_BE_HIGHER.replace("{member}", user.tag),
      });
    }

    await member.kick(reason);

    try {
      await user.send({
        content: lang.ADMIN.KICK_SUCCESS_DM.replace(
          "{guild_name}",
          interaction.guild?.name!,
        ).replace("{ban_reason}", reason),
      });
      // eslint-disable-next-line no-empty
    } catch {}

    await interaction.reply({
      ephemeral: true,
      content: lang.ADMIN.KICK_SUCCESS.replace("{tag}", user.tag).replace("{reason}", reason),
    });

    this.bot.emit("guildKickAdd", interaction.guild, {
      member,
      executor: interaction.user,
      reason,
    });
  }

  kickable(member: DJS.GuildMember) {
    if (member.kickable) return true;

    if (member.permissions.has(DJS.Permissions.FLAGS.KICK_MEMBERS)) return false;
    if (member.permissions.has(DJS.Permissions.FLAGS.ADMINISTRATOR)) return false;

    return true;
  }
}
