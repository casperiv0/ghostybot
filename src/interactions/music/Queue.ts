import * as DJS from "discord.js";
import { Bot } from "structures/Bot";
import { SubCommand } from "structures/Command/SubCommand";

export default class QueueCommand extends SubCommand {
  constructor(bot: Bot) {
    super(bot, {
      commandName: "music",
      name: "queue",
      description: "Show top 20 songs in the queue",
    });
  }

  async execute(
    interaction: DJS.CommandInteraction,
    lang: typeof import("@locales/english").default,
  ) {
    const queue = this.bot.player.getQueue(interaction.guildId!);
    if (!queue) {
      return interaction.reply({ ephemeral: true, content: lang.MUSIC.NO_QUEUE });
    }

    const tracks = queue.songs
      .map((track, idx) => {
        return `${idx === 0 ? `**${lang.MUSIC.NOW_PLAYING}**` : `**${idx}:**`} ${track.name}`;
      })
      .slice(0, 20)
      .join("\n");

    const embed = this.bot.utils
      .baseEmbed(interaction)
      .setTitle(`${interaction.guild?.name} ${lang.MUSIC.QUEUE}`)
      .setDescription(tracks);

    await interaction.reply({ embeds: [embed] });
  }
}
