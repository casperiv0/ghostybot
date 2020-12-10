module.exports = {
  name: "shuffle",
  description: "Shuffle the queue",
  aliases: ["sh"],
  category: "music",
  async execute(bot, message) {
    const lang = await bot.getGuildLang(message.guild.id);
    if (!message.member.voice.channel) {
      return message.channel.send(lang.MUSIC.MUST_BE_IN_VC);
    }

    const queue = await bot.player.getQueue(message);
    if (!bot.player.isPlaying(message)) {
      return message.channel.send(lang.MUSIC.NO_QUEUE);
    }

    if (!queue) {
      return message.channel.send(lang.MUSIC.NO_QUEUE);
    }

    bot.player.shuffle(message);
    message.react("🔀");
  },
};
