import Command from "../../structures/Command";
import Bot from "../../structures/Bot";
import { Message } from "discord.js";

export default class SearchCommand extends Command {
  constructor(bot: Bot) {
    super(bot, {
      name: "search",
      description: "search, select and play a song",
      aliases: ["sr"],
      category: "music",
      usage: "<song name>",
      requiredArgs: ["song name"],
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
      await bot.player.play(message, search);
    } catch (e) {
      bot.logger.error("PLAY", e?.stack || e);
    }
  }
}
