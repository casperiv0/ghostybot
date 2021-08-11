import * as DJS from "discord.js";
import { Bot } from "structures/Bot";
import { ValidateReturn } from "structures/Command/Command";
import { SubCommand } from "structures/Command/SubCommand";

export default class VoiceMuteCommand extends SubCommand {
  constructor(bot: Bot) {
    super(bot, {
      commandName: "admin",
      groupName: "voice",
      name: "unmute",
      description: "Unmute a user that is in a voice channel",
      options: [
        {
          name: "user",
          type: "USER",
          description: "The user you want to voice unmute",
          required: true,
        },
      ],
    });
  }

  async validate(
    interaction: DJS.CommandInteraction,
    lang: typeof import("@locales/english").default,
  ): Promise<ValidateReturn> {
    const perms = this.bot.utils.formatMemberPermissions(
      [DJS.Permissions.FLAGS.MUTE_MEMBERS],
      interaction,
      lang,
    );

    if (perms) {
      return { ok: false, error: { content: perms, ephemeral: true } };
    }

    const botPerms = this.bot.utils.formatBotPermissions(
      [DJS.Permissions.FLAGS.MUTE_MEMBERS],
      interaction,
      lang,
    );

    if (botPerms) {
      return { ok: false, error: { embeds: [botPerms], ephemeral: true } };
    }

    return { ok: true };
  }

  async execute(
    interaction: DJS.CommandInteraction,
    lang: typeof import("@locales/english").default,
  ) {
    const user = interaction.options.getUser("user", true);

    const member = await this.bot.utils.findMember(interaction, [user.id]);
    if (!member) {
      return interaction.reply({
        ephemeral: true,
        content: lang.MEMBER.NOT_FOUND,
      });
    }

    if (!member.voice.channel || !member.voice.serverMute) {
      return interaction.reply({
        ephemeral: true,
        content: lang.ADMIN.USER_NOT_VOICE_OR_NOT_MUTED,
      });
    }

    member.voice.setMute(false);

    await user
      .send({
        content: lang.ADMIN.YOU_UNMUTED.replace("{guildName}", `${interaction.guild?.name}`),
      })
      .catch(() => null);

    await interaction.reply({
      ephemeral: true,
      content: lang.ADMIN.USER_SUC_UNMUTED.replace("{unmuteUserTag}", user.tag),
    });
  }
}
