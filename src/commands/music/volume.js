module.exports = {
  name: "volume",
  description: "Set the volume between 1 to 100",
  category: "music",
  aliases: ["vol"],
  async execute(bot, message, args) {
    const [newVol] = args;
    const lang = await bot.getGuildLang(message.guild.id);
    const queue = await bot.player.getQueue(message);
    if (!message.member.voice.channel) {
      return message.channel.send(lang.MUSIC.MUST_BE_IN_VC);
    }

    if (!bot.player.isPlaying(message)) {
      return message.channel.send(lang.MUSIC.NO_QUEUE);
    }

    if (!queue) {
      return message.channel.send(lang.MUSIC.NO_QUEUE);
    }

    if (isNaN(newVol)) {
      return message.channel.send(lang.LEVELS.PROVIDE_VALID_NR);
    }

    if (Number(newVol) < 0) {
      return message.channel.send(lang.MUSIC.BETWEEN_0_100);
    }

    if (Number(newVol) > 100) {
      return message.channel.send(lang.MUSIC.BETWEEN_0_100);
    }

    if (!newVol) {
      return message.channel.send(lang.LEVELS.PROVIDE_VALID_NR);
    }

    bot.player.setVolume(message, newVol);
    await message.channel.send(lang.MUSIC.VOL_SUCCESS.replace("{vol}", newVol));
  },
};
