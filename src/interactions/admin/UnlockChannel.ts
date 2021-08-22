import * as DJS from "discord.js";
import { Bot } from "structures/Bot";
import { ValidateReturn } from "structures/Command/BaseCommand";
import { SubCommand } from "structures/Command/SubCommand";

export default class UnlockChannelCommand extends SubCommand {
  constructor(bot: Bot) {
    super(bot, {
      commandName: "admin",
      name: "unlock-channel",
      description: "Unlock the current channel",
      botPermissions: [DJS.Permissions.FLAGS.MANAGE_CHANNELS],
      memberPermissions: [DJS.Permissions.FLAGS.MANAGE_CHANNELS],
    });
  }

  async validate(
    interaction: DJS.CommandInteraction,
    lang: typeof import("@locales/english").default,
  ): Promise<ValidateReturn> {
    const threadChannels = ["GUILD_NEWS_THREAD", "GUILD_PUBLIC_THREAD", "GUILD_PRIVATE_THREAD"];
    if (threadChannels.includes(interaction.channel?.type!)) {
      return {
        ok: false,
        error: { ephemeral: true, content: lang.ADMIN.CANNOT_USE_CMD_THREAD },
      };
    }

    return { ok: true };
  }

  async execute(
    interaction: DJS.CommandInteraction,
    lang: typeof import("@locales/english").default,
  ) {
    const channel = interaction.channel as DJS.TextChannel;

    if (channel?.permissionsFor(interaction.guildId!)?.has(DJS.Permissions.FLAGS.SEND_MESSAGES)) {
      return interaction.reply({
        ephemeral: true,
        content: lang.ADMIN.CHAN_NOT_LOCK,
      });
    }

    await channel.permissionOverwrites.create(interaction.guildId!, {
      SEND_MESSAGES: true,
    });

    await interaction.reply({
      content: lang.ADMIN.SUC_UNLOCK.replace("{channel}", channel.toString()),
    });
  }
}
