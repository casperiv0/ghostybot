import * as DJS from "discord.js";
import { Bot } from "structures/Bot";
import { ValidateReturn } from "structures/Command/BaseCommand";
import { SubCommand } from "structures/Command/SubCommand";

export default class RemoveCommand extends SubCommand {
  constructor(bot: Bot) {
    super(bot, {
      commandName: "music",
      name: "remove",
      description: "Remove a song from the queue",
      options: [
        {
          description: "The position of the song in the queue",
          name: "track-number",
          required: true,
          type: "INTEGER",
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
    const songNo = interaction.options.getInteger("track-number", true);
    const queue = this.bot.player.getQueue(interaction.guildId!);

    if (!queue || !queue.playing) {
      return interaction.reply({ ephemeral: true, content: lang.MUSIC.NO_QUEUE });
    }

    if (queue && !this.bot.utils.isBotInSameChannel(interaction)) {
      return interaction.reply({ ephemeral: true, content: lang.MUSIC.BOT_NOT_IN_VC });
    }

    if (songNo < 1) {
      return interaction.reply({
        ephemeral: true,
        content: lang.MUSIC.BETWEEN_1_TOTALQUEUE.replace(
          "{totalQueue}",
          `${queue.songs.length - 1}`,
        ),
      });
    }

    if (songNo >= queue.songs.length) {
      return interaction.reply({
        ephemeral: true,
        content: lang.MUSIC.BETWEEN_1_TOTALQUEUE.replace(
          "{totalQueue}",
          `${queue.songs.length - 1}`,
        ),
      });
    }

    const song = queue.songs[songNo];
    queue.songs.splice(songNo, 1);

    await interaction.reply({
      content: `**${song.name}** ${lang.MUSIC.REMOVE_SUCCESS}`,
    });
  }
}
