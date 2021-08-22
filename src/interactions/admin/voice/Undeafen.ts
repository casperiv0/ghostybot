import * as DJS from "discord.js";
import { Bot } from "structures/Bot";
import { SubCommand } from "structures/Command/SubCommand";

export default class VoiceUndeafenCommand extends SubCommand {
  constructor(bot: Bot) {
    super(bot, {
      commandName: "admin",
      groupName: "voice",
      name: "undeafen",
      description: "Undeafen a user that is in a voice channel",
      botPermissions: [DJS.Permissions.FLAGS.DEAFEN_MEMBERS],
      memberPermissions: [DJS.Permissions.FLAGS.DEAFEN_MEMBERS],
      options: [
        {
          name: "user",
          type: "USER",
          description: "The user you want to voice undeafen",
          required: true,
        },
      ],
    });
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

    if (!member.voice.channel || member?.voice?.serverDeaf) {
      return interaction.reply({
        ephemeral: true,
        content: lang.ADMIN.DEAFEN_ALREADY_DEAFENED,
      });
    }

    member.voice.setDeaf(false);

    await user
      .send({
        content: lang.ADMIN.UNDEAFENED_USER.replace("{guildName}", `${interaction.guild?.name}`),
      })
      .catch(() => null);

    await interaction.reply({
      ephemeral: true,
      content: lang.ADMIN.UNDEAFENED.replace("{undeafenUserTag}", user.tag),
    });
  }
}
