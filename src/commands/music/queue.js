const BaseEmbed = require("../../modules/BaseEmbed");

module.exports = {
  name: "queue",
  description: "Show top 20 songs in the queue",
  aliases: ["q"],
  category: "music",
  async execute(bot, message) {
    const lang = await bot.getGuildLang(message.guild.id);
    if (!message.member.voice.channel) {
      return message.channel.send(lang.MUSIC.MUST_BE_IN_VC);
    }

    const queue = bot.player.getQueue(message);

    if (!queue) {
      return message.channel.send(lang.MUSIC.NO_QUEUE);
    }

    const embed = BaseEmbed(message)
      .setTitle(`${message.guild.name} ${lang.MUSIC.QUEUE}`)
      .setDescription(
        queue.tracks.splice(0, 1024).map((song, idx) => {
          return `${++idx}: ${song.title}`;
        })
      );

    message.channel.send(embed);
  },
};
