module.exports = {
  name: "volume",
  description: "Set the volume between 1 to 100",
  category: "music",
  aliases: ["vol"],
  async execute(bot, message, args, serverQueue) {
    const lang = await bot.getGuildLang(message.guild.id);
    if (!message.member.voice.channel) {
      return message.channel.send(lang.MUSIC.MUST_BE_IN_VC);
    }

    if (!serverQueue) {
      return message.channel.send(lang.MUSIC.NO_QUEUE);
    }

    if (Number(args[0]) > 100) {
      return message.channel.send(lang.MUSIC.BETWEEN_0_100);
    }

    if (!args[0]) {
      return message.channel.send(lang.LEVELS.PROVIDE_VALID_NR);
    }

    const volume = args[0] / 100;
    serverQueue.volume = volume;
    await serverQueue.connection.dispatcher.setVolume(volume);
    await message.channel.send(
      lang.MUSIC.VOL_SUCCESS.replace("{vol}", args[0])
    );
  },
};
