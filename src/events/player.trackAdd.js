const BaseEmbed = require("../modules/BaseEmbed");

module.exports = {
  name: "trackAdd",
  async execute(bot, message, queue, track) {
    const lang = await bot.getGuildLang(message.guild.id);

    const embed = BaseEmbed(message)
      .setTitle(`${lang.MUSIC.ADDED_TO_QUEUE.replace("{song}", track.title)}`)
      .setAuthor(`${lang.MUSIC.REQUESTED_BY} ${track.requestedBy.username}`)
      .setImage(track.thumbnail);

    return message.channel.send(embed);
  },
};
