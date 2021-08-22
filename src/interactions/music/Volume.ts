import * as DJS from "discord.js";
import { Bot } from "structures/Bot";
import { ValidateReturn } from "structures/Command/BaseCommand";
import { SubCommand } from "structures/Command/SubCommand";

export default class VolumeCommand extends SubCommand {
  constructor(bot: Bot) {
    super(bot, {
      commandName: "music",
      name: "volume",
      description: "Set the volume for the current queue",
      options: [
        {
          description: "The new volume",
          name: "volume",
          required: true,
          type: "NUMBER",
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
    const newVol = interaction.options.getNumber("volume", true);

    const queue = this.bot.player.getQueue(interaction.guildId!);
    if (!queue || !queue.playing) {
      return interaction.reply({ ephemeral: true, content: lang.MUSIC.NO_QUEUE });
    }

    if (queue && !this.bot.utils.isBotInSameChannel(interaction)) {
      return interaction.reply({ ephemeral: true, content: lang.MUSIC.BOT_NOT_IN_VC });
    }

    if (newVol < 0) {
      return interaction.reply({ ephemeral: true, content: lang.MUSIC.BETWEEN_0_100 });
    }

    if (newVol > 100) {
      return interaction.reply({ ephemeral: true, content: lang.MUSIC.BETWEEN_0_100 });
    }

    this.bot.player.setVolume(interaction.guildId!, newVol);
    await interaction.reply({
      content: lang.MUSIC.VOL_SUCCESS.replace("{vol}", newVol.toString()),
    });
  }
}
