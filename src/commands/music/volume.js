module.exports = {
  name: "volume",
  description: "Set the volume between 1 to 100",
  category: "music",
  aliases: ["vol"],
  async execute(bot, message, args) {
    const lang = await bot.getGuildLang(message.guild.id);
    if (!message.member.voice.channel) {
      return message.channel.send(lang.MUSIC.MUST_BE_IN_VC);
    }

    if (!bot.player.isPlaying(message)) {
      return message.channel.send(lang.MUSIC.NO_QUEUE);
    }

    if (Number(args[0]) > 100) {
      return message.channel.send(lang.MUSIC.BETWEEN_0_100);
    }

    if (!args[0]) {
      return message.channel.send(lang.LEVELS.PROVIDE_VALID_NR);
    }

    bot.player.setVolume(message, args[0]);
    await message.channel.send(
      lang.MUSIC.VOL_SUCCESS.replace("{vol}", args[0])
    );
  },
};
