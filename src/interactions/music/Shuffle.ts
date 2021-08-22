import * as DJS from "discord.js";
import { Bot } from "structures/Bot";
import { ValidateReturn } from "structures/Command/BaseCommand";
import { SubCommand } from "structures/Command/SubCommand";

export default class ShuffleCommand extends SubCommand {
  constructor(bot: Bot) {
    super(bot, {
      commandName: "music",
      name: "shuffle",
      description: "Shuffle the current queue",
    });
  }

  async validate(
    interaction: DJS.CommandInteraction,
    lang: typeof import("@locales/english").default,
  ): Promise<ValidateReturn> {
    const member = await this.bot.utils.findMember(interaction, [interaction.user.id], {
      allowAuthor: true,
    });

    if (!member?.voice.channel) {
      return { ok: false, error: { ephemeral: true, content: lang.MUSIC.MUST_BE_IN_VC } };
    }

    return { ok: true };
  }

  async execute(
    interaction: DJS.CommandInteraction,
    lang: typeof import("@locales/english").default,
  ) {
    const queue = this.bot.player.getQueue(interaction.guildId!);
    if (!queue || !queue.playing) {
      return interaction.reply({ ephemeral: true, content: lang.MUSIC.NO_QUEUE });
    }

    if (queue && !this.bot.utils.isBotInSameChannel(interaction)) {
      return interaction.reply({ ephemeral: true, content: lang.MUSIC.BOT_NOT_IN_VC });
    }

    if (queue.songs.length <= 1) {
      return interaction.reply({ ephemeral: true, content: lang.MUSIC.ERRORS.NO_UP_NEXT });
    }

    this.bot.player.shuffle(interaction.guildId!);

    await interaction.reply({ content: "🔀" });
  }
}
