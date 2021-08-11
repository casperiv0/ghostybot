import * as DJS from "discord.js";
import { Bot } from "structures/Bot";
import { ValidateReturn } from "structures/Command/Command";
import { SubCommand } from "structures/Command/SubCommand";

export default class SetStickyCommand extends SubCommand {
  constructor(bot: Bot) {
    super(bot, {
      commandName: "admin",
      groupName: "sticky",
      name: "set",
      description: "Set a new sticky message for the current channel",
      options: [
        {
          name: "text",
          required: true,
          description: "The text you want as a sticky message",
          type: "STRING",
        },
      ],
    });
  }

  async validate(
    interaction: DJS.CommandInteraction,
    lang: typeof import("@locales/english").default,
  ): Promise<ValidateReturn> {
    const perms = this.bot.utils.formatMemberPermissions(
      [DJS.Permissions.FLAGS.MANAGE_GUILD],
      interaction,
      lang,
    );

    if (perms) {
      return { ok: false, error: { content: perms, ephemeral: true } };
    }

    const botPerms = this.bot.utils.formatBotPermissions(
      [DJS.Permissions.FLAGS.MANAGE_MESSAGES],
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
    const text = interaction.options.getString("text", true);

    if (text.length > 1800) {
      return interaction.reply({
        ephemeral: true,
        content: lang.ADMIN.STICKY_LONG,
      });
    }

    const msg = `${lang.ADMIN.STICKY_READ}\n\n${text}`;

    await interaction.reply({
      content: "Done!",
      ephemeral: true,
    });

    const channel = (await interaction.guild?.channels
      .fetch(interaction.channelId)
      .catch(() => null)) as DJS.TextChannel | null;

    const stickyMessage = await channel?.send({ content: msg });

    await this.bot.utils.addSticky(stickyMessage?.id!, interaction.channelId, msg);
  }
}
