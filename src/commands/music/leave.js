module.exports = {
  name: "leave",
  description: "Let the bot disconnect",
  aliases: ["disconnect", "l"],
  category: "music",
  async execute(bot, message, args, serverQueue) {
    const lang = await bot.getGuildLang(message.guild.id);
    if (!message.member.voice.channel) {
      return message.channel.send(lang.MUSIC.MUST_BE_IN_VC);
    }

    if (!serverQueue) {
      return message.channel.send(lang.MUSIC.NO_QUEUE);
    }

    serverQueue.songs = [];
    serverQueue.playing = false;
    serverQueue.connection.dispatcher?.end();
    serverQueue.voiceChannel.leave();
    message.react("👍");
  },
};
