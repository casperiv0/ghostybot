import * as DJS from "discord.js";
import { Bot } from "structures/Bot";
import { SubCommand } from "structures/Command/SubCommand";

export default class VoiceMuteCommand extends SubCommand {
  constructor(bot: Bot) {
    super(bot, {
      commandName: "admin",
      groupName: "voice",
      name: "mute",
      description: "Mute a user that is in a voice channel",
      botPermissions: [DJS.PermissionFlagsBits.MuteMembers],
      memberPermissions: [DJS.PermissionFlagsBits.MuteMembers],
      options: [
        {
          name: "user",
          type: DJS.ApplicationCommandOptionType.User,
          description: "The user you want to voice mute",
          required: true,
        },
        {
          name: "reason",
          type: DJS.ApplicationCommandOptionType.String,
          description: "The reason why you want to mute the user",
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
    if (!member) {
      return interaction.reply({
        ephemeral: true,
        content: lang.MEMBER.NOT_FOUND,
      });
    }

    if (!member.voice.channel || member.voice.serverMute) {
      return interaction.reply({
        ephemeral: true,
        content: lang.ADMIN.USER_NOT_VOICE_OR_MUTED,
      });
    }

    member.voice.setMute(true, reason);

    await user
      .send({
        content: this.bot.utils.translate(lang.ADMIN.YOU_MUTED, {
          guildName: interaction.guild!.name,
          reason,
        }),
      })
      .catch(() => null);

    await interaction.reply({
      ephemeral: true,
      content: this.bot.utils.translate(lang.ADMIN.USER_MUTED, {
        muteUserTag: user.tag,
        reason,
      }),
    });
  }
}
