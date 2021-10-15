import * as DJS from "discord.js";
import { Bot } from "structures/Bot";
import { SubCommand } from "structures/Command/SubCommand";

export default class MuteCommand extends SubCommand {
  constructor(bot: Bot) {
    super(bot, {
      commandName: "admin",
      name: "mute",
      description: "Mute/tempmute a user",
      botPermissions: [DJS.Permissions.FLAGS.MANAGE_ROLES, DJS.Permissions.FLAGS.MANAGE_CHANNELS],
      memberPermissions: [
        DJS.Permissions.FLAGS.MANAGE_ROLES,
        DJS.Permissions.FLAGS.MANAGE_CHANNELS,
      ],
      options: [
        {
          name: "user",
          description: "The user to mute",
          type: "USER",
          required: true,
        },
        {
          name: "reason",
          description: "The mute reason",
          type: "STRING",
          required: false,
        },
        {
          name: "time",
          description: "How long the user will be muted (Default: Until manually unmuted)",
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
    const time = interaction.options.getString("time");

    const member = await this.bot.utils.findMember(interaction, [user.id]);
    if (!member || member.permissions.has(DJS.Permissions.FLAGS.MANAGE_ROLES)) {
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

    let content;
    let dmContent;
    if (time) {
      content = lang.ADMIN.SUCCESS_MUTED.replace("{muteMemberTag}", user.tag)
        .replace("{time}", time)
        .replace("{reason}", reason);

      dmContent = lang.ADMIN.TEMP_MUTED.replace("{guildName}", interaction.guild!.name)
        .replace("{reason}", reason)
        .replace("{time}", time);
    } else {
      dmContent = lang.ADMIN.MUTE_SUCCESS_DM.replace("{guild}", interaction.guild!.name).replace(
        "{reason}",
        reason,
      );

      content = lang.ADMIN.MUTE_SUCCESS.replace("{tag}", user.tag).replace("{reason}", reason);
    }

    await interaction.reply({ content, ephemeral: true });
    await user.send({
      content: dmContent,
    });

    await this.bot.utils.updateMuteChannelPerms(interaction.guild!, user.id, {
      SEND_MESSAGES: false,
      ADD_REACTIONS: false,
      CONNECT: false,
    });
    await member.roles.add(muteRole);

    this.bot.emit("guildMuteAdd", interaction.guild, {
      member,
      executor: interaction.user,
      tempMute: !!time,
      reason,
      time,
    });
  }
}
