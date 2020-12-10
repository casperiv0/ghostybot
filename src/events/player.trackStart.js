const BaseEmbed = require("../modules/BaseEmbed");

module.exports = {
  name: "trackStart",
  async execute(bot, message, track) {
    const lang = await bot.getGuildLang(message.guild.id);

    const embed = BaseEmbed(message)
      .setTitle(`${lang.MUSIC.NOW_PLAYING} ${track.title}`)
      .setAuthor(`${lang.MUSIC.REQUESTED_BY} ${track.requestedBy.username}`)
      .setImage(track.thumbnail);

    return message.channel.send(embed);
  },
};
