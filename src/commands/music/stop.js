module.exports = {
  name: "stop",
  description: "stop",
  category: "music",
  aliases: ["leave"],
  async execute(bot, message) {
    const lang = await bot.getGuildLang(message.guild.id);
    if (!message.member.voice.channel) {
      return message.channel.send(lang.MUSIC.MUST_BE_IN_VC);
    }

    if (!bot.player.isPlaying(message)) {
      return message.channel.send(lang.MUSIC.NO_QUEUE);
    }

    bot.player.stop(message);
    message.react("👍");
  },
};
