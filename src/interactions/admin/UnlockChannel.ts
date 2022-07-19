import * as DJS from "discord.js";
import { Bot } from "structures/Bot";
import { ValidateReturn } from "structures/Command/BaseCommand";
import { SubCommand } from "structures/Command/SubCommand";

export const threadChannels = [
  DJS.ChannelType.GuildNewsThread,
  DJS.ChannelType.GuildPublicThread,
  DJS.ChannelType.GuildPrivateThread,
];

export default class UnlockChannelCommand extends SubCommand {
  constructor(bot: Bot) {
    super(bot, {
      commandName: "admin",
      name: "unlock-channel",
      description: "Unlock the current channel",
      botPermissions: [DJS.PermissionFlagsBits.ManageChannels],
      memberPermissions: [DJS.PermissionFlagsBits.ManageChannels],
    });
  }

  async validate(
    interaction: DJS.ChatInputCommandInteraction<"cached" | "raw">,
    lang: typeof import("@locales/english").default,
  ): Promise<ValidateReturn> {
    if (threadChannels.includes(interaction.channel!.type)) {
      return {
        ok: false,
        error: { ephemeral: true, content: lang.ADMIN.CANNOT_USE_CMD_THREAD },
      };
    }

    return { ok: true };
  }

  async execute(
    interaction: DJS.ChatInputCommandInteraction<"cached" | "raw">,
    lang: typeof import("@locales/english").default,
  ) {
    const channel = interaction.channel as DJS.TextChannel;

    if (channel.permissionsFor(interaction.guildId!)?.has(DJS.PermissionFlagsBits.SendMessages)) {
      return interaction.reply({
        ephemeral: true,
        content: lang.ADMIN.CHAN_NOT_LOCK,
      });
    }

    await channel.permissionOverwrites.create(interaction.guildId!, {
      SendMessages: true,
    });

    await interaction.reply({
      content: this.bot.utils.translate(lang.ADMIN.SUC_UNLOCK, {
        channel: channel.toString(),
      }),
    });
  }
}
