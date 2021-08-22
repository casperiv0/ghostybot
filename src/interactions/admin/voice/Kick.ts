import * as DJS from "discord.js";
import { Bot } from "structures/Bot";
import { SubCommand } from "structures/Command/SubCommand";

export default class VoiceKickCommand extends SubCommand {
  constructor(bot: Bot) {
    super(bot, {
      commandName: "admin",
      groupName: "voice",
      name: "kick",
      description: "Kick a user that is in a voice channel",
      botPermissions: [DJS.Permissions.FLAGS.MOVE_MEMBERS],
      memberPermissions: [DJS.Permissions.FLAGS.MOVE_MEMBERS],
      options: [
        {
          name: "user",
          type: "USER",
          description: "The user you want to voice kick",
          required: true,
        },
        {
          name: "reason",
          type: "STRING",
          description: "The reason why you want to kick the user",
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
    if (!member) {
      return interaction.reply({
        ephemeral: true,
        content: lang.MEMBER.NOT_FOUND,
      });
    }

    if (
      member.permissions.has(
        DJS.Permissions.FLAGS.MOVE_MEMBERS || DJS.Permissions.FLAGS.ADMINISTRATOR,
      )
    ) {
      return interaction.reply({
        ephemeral: true,
        content: lang.ADMIN.CAN_NOT_DISC,
      });
    }

    if (!member.voice.channel) {
      return interaction.reply({
        ephemeral: true,
        content: lang.ADMIN.NOT_IN_VOICE,
      });
    }

    member.voice.disconnect(reason);

    await user
      .send({
        content: lang.ADMIN.YOU_DISC.replace("{guildName}", `${interaction.guild?.name}`).replace(
          "{reason}",
          reason,
        ),
      })
      .catch(() => null);

    await interaction.reply({
      ephemeral: true,
      content: lang.ADMIN.USER_DISC.replace("{kickUserTag}", user.tag)
        .replace("{kickUserVoiceChannel}", `${member.voice.channel}`)
        .replace("{reason}", reason),
    });
  }
}
