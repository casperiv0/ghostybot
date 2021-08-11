import * as DJS from "discord.js";
import { Bot } from "structures/Bot";
import { ValidateReturn } from "structures/Command/Command";
import { SubCommand } from "structures/Command/SubCommand";

export default class VoiceDeafenCommand extends SubCommand {
  constructor(bot: Bot) {
    super(bot, {
      commandName: "admin",
      groupName: "voice",
      name: "deafen",
      description: "Deafen a user that is in a voice channel",
      options: [
        {
          name: "user",
          type: "USER",
          description: "The user you want to voice deafen",
          required: true,
        },
        {
          name: "reason",
          type: "STRING",
          description: "The reason why you want to deafen the user",
          required: false,
        },
      ],
    });
  }

  async validate(
    interaction: DJS.CommandInteraction,
    lang: typeof import("@locales/english").default,
  ): Promise<ValidateReturn> {
    const perms = this.bot.utils.formatMemberPermissions(
      [DJS.Permissions.FLAGS.DEAFEN_MEMBERS],
      interaction,
      lang,
    );

    if (perms) {
      return { ok: false, error: { content: perms, ephemeral: true } };
    }

    const botPerms = this.bot.utils.formatBotPermissions(
      [DJS.Permissions.FLAGS.DEAFEN_MEMBERS],
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
    const reason = interaction.options.getString("reason") ?? lang.GLOBAL.NOT_SPECIFIED;

    const member = await this.bot.utils.findMember(interaction, [user.id]);
    if (!member) {
      return interaction.reply({
        ephemeral: true,
        content: lang.MEMBER.NOT_FOUND,
      });
    }

    if (!member.voice.channel || member?.voice?.serverDeaf) {
      return interaction.reply({
        ephemeral: true,
        content: lang.ADMIN.DEAFEN_ALREADY_DEAFENED,
      });
    }

    member.voice.setDeaf(true, reason);

    await user
      .send({
        content: lang.ADMIN.DEAFEN_SUCCESS_DM.replace(
          "{guild}",
          `${interaction.guild?.name}`,
        ).replace("{reason}", reason),
      })
      .catch(() => null);

    await interaction.reply({
      ephemeral: true,
      content: lang.ADMIN.DEAFEN_SUCCESS.replace("{member}", user.tag).replace("{reason}", reason),
    });
  }
}
