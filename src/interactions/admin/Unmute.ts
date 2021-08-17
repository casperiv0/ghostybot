import * as DJS from "discord.js";
import { Bot } from "structures/Bot";
import { SubCommand } from "structures/Command/SubCommand";

export default class UnmuteCommand extends SubCommand {
  constructor(bot: Bot) {
    super(bot, {
      commandName: "admin",
      name: "unmute",
      description: "Unmute a user",
      botPermissions: [DJS.Permissions.FLAGS.MANAGE_ROLES, DJS.Permissions.FLAGS.MANAGE_CHANNELS],
      memberPermissions: [
        DJS.Permissions.FLAGS.MANAGE_ROLES,
        DJS.Permissions.FLAGS.MANAGE_CHANNELS,
      ],
      options: [
        {
          name: "user",
          description: "The user to unmute",
          type: "USER",
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
    const mutedRole = await this.bot.utils.findOrCreateMutedRole(interaction.guild!);
    if (!mutedRole) {
      return interaction.reply({ ephemeral: true, content: lang.GLOBAL.ERROR });
    }

    if (!member) {
      return interaction.reply({
        ephemeral: true,
        content: lang.ADMIN.PROVIDE_VALID_MEMBER,
      });
    }

    if (!member.roles.cache.some((r) => r.id === mutedRole?.id)) {
      return interaction.reply({
        ephemeral: true,
        content: lang.ADMIN.NOT_MUTED,
      });
    }

    interaction.guild?.channels.cache.forEach((channel) => {
      if (channel instanceof DJS.ThreadChannel) return;

      channel.permissionOverwrites.delete(member.id);
    });

    await this.bot.utils.updateUserById(user.id, interaction.guildId!, {
      mute: {
        reason: null,
        muted: false,
        ends_at: 0,
        time: null,
      },
    });

    interaction.reply({
      ephemeral: true,
      content: lang.ADMIN.SUC_UNMUTE.replace("{mutedMemberTag}", user.tag),
    });

    member.roles.remove(mutedRole);

    this.bot.emit("guildMuteRemove", interaction.guild, {
      member,
      executor: interaction.user,
    });
  }
}
