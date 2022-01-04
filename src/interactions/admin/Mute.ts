import * as DJS from "discord.js";
import ms from "ms";
import { Bot } from "structures/Bot";
import { SubCommand } from "structures/Command/SubCommand";

const permissions = [DJS.Permissions.FLAGS.MODERATE_MEMBERS];

export default class MuteCommand extends SubCommand {
  constructor(bot: Bot) {
    super(bot, {
      commandName: "admin",
      name: "mute",
      description: "Timeout a user",
      botPermissions: permissions,
      memberPermissions: permissions,
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
        content: lang.ADMIN.MUTE_CANNOT_MUTE,
      });
    }

    if (typeof member.communicationDisabledUntilTimestamp === "number") {
      return interaction.reply({ ephemeral: true, content: lang.ADMIN.MUTE_ALREADY_MUTED });
    }

    const content = lang.ADMIN.MUTE_SUCCESS.replace("{muteMemberTag}", member.user.tag)
      .replace("{time}", time)
      .replace("{reason}", reason);

    const dmContent = lang.ADMIN.MUTE_SUCCESS_DM.replace("{guildName}", interaction.guild!.name)
      .replace("{reason}", reason)
      .replace("{time}", time);

    const parsedTime = ms(time);
    if (parsedTime < 60000 || isNaN(parsedTime)) {
      return interaction.reply({ ephemeral: true, content: "Must be longer than 1 minute" });
    }

    await member.timeout(parsedTime, reason);

    await interaction.reply({ content, ephemeral: true });
    await member.user.send({
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
