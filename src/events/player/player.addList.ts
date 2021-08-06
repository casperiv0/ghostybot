import { Playlist, Queue } from "distube";
import { Bot } from "structures/Bot";
import { Event } from "structures/Event";

export default class PlayerAddListEvent extends Event {
  constructor(bot: Bot) {
    super(bot, "addList");
  }

  async execute(bot: Bot, queue: Queue, playlist: Playlist) {
    try {
      const channel = queue.textChannel;

      if (!channel?.guild?.available) return;
      if (!bot.utils.hasSendPermissions(channel)) return;
      const lang = await bot.utils.getGuildLang(channel?.guild?.id);
      if (!playlist) return;

      const embed = bot.utils
        .baseEmbed({ author: playlist.user ?? null })
        .setTitle(
          lang.MUSIC.ADDED_PL_TO_QUEUE.replace(
            "{length}",
            playlist.songs.length.toString(),
          ).replace("{name}", playlist.name),
        );

      return channel?.send({ embeds: [embed] });
    } catch (err) {
      bot.utils.sendErrorLog(err, "error");
    }
  }
}
