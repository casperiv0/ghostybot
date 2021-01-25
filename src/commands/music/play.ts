import Command from "../../structures/Command";
import Bot from "../../structures/Bot";
import { Message } from "discord.js";

export default class PlayCommand extends Command {
  constructor(bot: Bot) {
    super(bot, {
      name: "play",
      description: "Play a song",
      aliases: ["p"],
      category: "music",
      usage: "<youtube link | song name>",
      requiredArgs: [{ name: "song" }],
    });
  }

  async execute(bot: Bot, message: Message, args: string[]) {
    const lang = await bot.utils.getGuildLang(message.guild?.id);
    const voiceChannel = message.member?.voice.channel;
    const search = args.join(" ");

    if (!search) {
      return message.channel.send(lang.MUSIC.PROVIDE_SEARCH);
    }

    if (!voiceChannel) {
      return message.channel.send(lang.MUSIC.MUST_BE_IN_VC);
    }

    if (!bot.user) return;
    const perms = voiceChannel.permissionsFor(bot.user);
    if (!perms?.has("CONNECT") || !perms.has("SPEAK")) {
      return message.channel.send(lang.MUSIC.NO_PERMS);
    }

    try {
      await bot.player.play(message, search, true);
    } catch (e) {
      bot.logger.error("PLAY", e?.stack || e);
    }
  }
}
