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

    bot.player.shuffle(message);
    message.react("🔀");
  },
};
