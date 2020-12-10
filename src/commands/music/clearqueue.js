module.exports = {
  name: "clearqueue",
  description: "Clear the music playlist",
  aliases: ["cq"],
  category: "music",
  async execute(bot, message) {
    const lang = await bot.getGuildLang(message.guild.id);
    if (!message.member.voice.channel) {
      return message.channel.send(lang.MUSIC.MUST_BE_IN_VC);
    }

    const playing = bot.player.isPlaying(message);

    if (!playing) {
      return message.channel.send(lang.MUSIC.NO_QUEUE);
    }

    bot.player.clearQueue(message);
    message.channel.send(lang.MUSIC.QUEUE_CLEARED);
  },
};
