import * as DJS from "discord.js";
import ms from "ms";
import { Bot } from "structures/Bot";
import { ValidateReturn } from "structures/Command/BaseCommand";
import { SubCommand } from "structures/Command/SubCommand";

export default class SeekCommand extends SubCommand {
  constructor(bot: Bot) {
    super(bot, {
      commandName: "music",
      name: "seek",
      description: "Seek through a song",
      options: [
        {
          description: "seconds/minutes/hours (eg: 200s, 10s, 1h)",
          name: "time",
          required: true,
          type: "STRING",
        },
      ],
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
    const time = ms(interaction.options.getString("time", true));

    const member = await this.bot.utils.findMember(interaction, [interaction.user.id], {
      allowAuthor: true,
    });

    if (!member?.voice.channel) {
      return interaction.reply({ ephemeral: true, content: lang.MUSIC.MUST_BE_IN_VC });
    }

    const queue = this.bot.player.getQueue(interaction.guildId!);
    if (!queue || !queue.playing) {
      return interaction.reply({ ephemeral: true, content: lang.MUSIC.NO_QUEUE });
    }

    if (queue && !this.bot.utils.isBotInSameChannel(interaction)) {
      return interaction.reply({ ephemeral: true, content: lang.MUSIC.BOT_NOT_IN_VC });
    }

    this.bot.player.seek(interaction.guildId!, time);
    await interaction.reply({ content: "Done!", ephemeral: true });
  }
}
