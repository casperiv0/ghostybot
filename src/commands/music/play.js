const Logger = require("../../modules/Logger");

module.exports = {
  name: "play",
  description: "Play a song",
  aliases: ["p"],
  category: "music",
  usage: "play <youtube link | song name>",
  async execute(bot, message, args) {
    const lang = await bot.getGuildLang(message.guild.id);
    const voiceChannel = message.member.voice.channel;
    const search = args.join(" ");

    if (!search) {
      return message.channel.send(lang.MUSIC.PROVIDE_SEARCH);
    }

    if (!voiceChannel) {
      return message.channel.send(lang.MUSIC.MUST_BE_IN_VC);
    }

    try {
      await bot.player.play(message, search);
    } catch (e) {
      Logger.error("PLAY", e);
    }
  },
};
