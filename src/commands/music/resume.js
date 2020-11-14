module.exports = {
  name: "resume",
  description: "Resume a song that was playing",
  aliases: ["r"],
  category: "music",
  async execute(bot, message) {
    const lang = await bot.getGuildLang(message.guild.id);
    if (!message.member.voice.channel) {
      return message.channel.send(lang.MUSIC.MUST_BE_IN_VC);
    }

    bot.player.resume(message);
  },
};
