import * as DJS from "discord.js";
import { Bot } from "structures/Bot";
import { ValidateReturn } from "structures/Command/BaseCommand";
import { SubCommand } from "structures/Command/SubCommand";

export const threadChannels = [
  DJS.ChannelType.GuildNewsThread,
  DJS.ChannelType.GuildPublicThread,
  DJS.ChannelType.GuildPrivateThread,
];

export default class LockChannelCommand extends SubCommand {
  constructor(bot: Bot) {
    super(bot, {
      commandName: "admin",
      name: "lock-channel",
      description: "Lock the current channel",
      botPermissions: [DJS.Permissions.FLAGS.MANAGE_CHANNELS],
      memberPermissions: [DJS.Permissions.FLAGS.MANAGE_CHANNELS],
      options: [
        {
          name: "reason",
          description: "The reason why the channel should be locked",
          type: DJS.ApplicationCommandOptionType.String,
          required: true,
        },
      ],
    });
  }

  async validate(
    interaction: DJS.ChatInputCommandInteraction<"cached">,
    lang: typeof import("@locales/english").default,
  ): Promise<ValidateReturn> {
    if (threadChannels.includes(interaction.channel?.type!)) {
      return {
        ok: false,
        error: { ephemeral: true, content: lang.ADMIN.CANNOT_USE_CMD_THREAD },
      };
    }

    return { ok: true };
  }

  async execute(
    interaction: DJS.ChatInputCommandInteraction<"cached">,
    lang: typeof import("@locales/english").default,
  ) {
    const reason = interaction.options.getString("reason", true);
    const channel = interaction.channel as DJS.TextChannel;

    if (!channel?.permissionsFor(interaction.guildId)?.has(DJS.Permissions.FLAGS.SEND_MESSAGES)) {
      return interaction.reply({
        ephemeral: true,
        content: lang.ADMIN.CHANNEL_ALREADY_LOCKED,
      });
    }

    await channel.permissionOverwrites.create(interaction.guildId, {
      SEND_MESSAGES: false,
    });

    await interaction.reply({
      content: this.bot.utils.translate(lang.ADMIN.LOCKED_CHANNEL_REASON, {
        channel: channel.toString(),
        lockReason: reason,
      }),
    });
  }
}
