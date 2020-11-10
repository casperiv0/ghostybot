module.exports = {
  name: "resume",
  description: "Resume a song that was playing",
  aliases: ["r"],
  category: "music",
  async execute(bot, message, args, serverQueue) {
    const lang = await bot.getGuildLang(message.guild.id);
    if (!message.member.voice.channel) {
      return message.channel.send(lang.MUSIC.MUST_BE_IN_VC);
    }

    if (!serverQueue) {
      return message.channel.send(lang.MUSIC.NO_QUEUE);
    }
    
    serverQueue.playing = true;
    serverQueue.connection.dispatcher.resume();
  },
};
