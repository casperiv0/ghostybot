import * as DJS from "discord.js";
import ms from "ms";
import { Bot } from "structures/Bot";
import { SubCommand } from "structures/Command/SubCommand";

export default class MuteCommand extends SubCommand {
  constructor(bot: Bot) {
    super(bot, {
      commandName: "admin",
      name: "mute",
      description: "Timeout a user",
      botPermissions: [
        DJS.Permissions.FLAGS.MANAGE_ROLES,
        DJS.Permissions.FLAGS.MANAGE_CHANNELS,
        DJS.Permissions.FLAGS.MODERATE_MEMBERS,
      ],
      memberPermissions: [
        DJS.Permissions.FLAGS.MANAGE_ROLES,
        DJS.Permissions.FLAGS.MANAGE_CHANNELS,
        DJS.Permissions.FLAGS.MODERATE_MEMBERS,
      ],
      options: [
        {
          name: "user",
          description: "The user to mute",
          type: "USER",
          required: true,
        },
        {
          name: "time",
          description: "How long the user will be muted (Min. 1 minute)",
          type: "STRING",
          required: true,
        },
        {
          name: "reason",
          description: "The mute reason",
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
    const member = interaction.options.getMember("user", true);
    const time = interaction.options.getString("time", true);
    const reason = interaction.options.getString("reason") ?? lang.GLOBAL.NOT_SPECIFIED;

    if (
      !member ||
      !("timeout" in member) ||
      member.permissions.has(DJS.Permissions.FLAGS.MANAGE_ROLES)
    ) {
      return interaction.reply({
        ephemeral: true,
        content: lang.ADMIN.CAN_NOT_MUTED,
      });
    }

    const muteRole = await this.bot.utils.findOrCreateMutedRole(interaction.guild!);
    if (!muteRole) {
      return interaction.reply({ ephemeral: true, content: lang.GLOBAL.ERROR });
    }

    if (member?.roles.cache.find((r) => r.id === muteRole?.id)) {
      return interaction.reply({ ephemeral: true, content: lang.ADMIN.ALREADY_MUTED });
    }

    const content = lang.ADMIN.SUCCESS_MUTED.replace("{muteMemberTag}", user.tag)
      .replace("{time}", time)
      .replace("{reason}", reason);

    const dmContent = lang.ADMIN.TEMP_MUTED.replace("{guildName}", interaction.guild!.name)
      .replace("{reason}", reason)
      .replace("{time}", time);

    const parsedTime = ms(time);
    if (parsedTime < 60000 || isNaN(parsedTime)) {
      return interaction.reply({ ephemeral: true, content: "Must be longer than 1 minute" });
    }

    await member.timeout(parsedTime, reason);

    await interaction.reply({ content, ephemeral: true });
    await user.send({
      content: dmContent,
    });

    this.bot.emit("guildMuteAdd", interaction.guild, {
      member,
      executor: interaction.user,
      tempMute: !!time,
      reason,
      time,
    });
  }
}
