module.exports = {
  name: "clearqueue",
  description: "Clear the music playlist",
  aliases: ["cq"],
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
    serverQueue.connection.dispatcher?.destroy();
    message.channel.send(lang.MUSIC.QUEUE_CLEARED);
  },
};
