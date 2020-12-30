const BaseEmbed = require("../modules/BaseEmbed");

module.exports = {
  name: "playlistAdd",
  async execute(bot, message, queue, playlist) {
    const lang = await bot.getGuildLang(message.guild.id);

    const embed = BaseEmbed(message).setTitle(
      `${lang.MUSIC.ADDED_PL_TO_QUEUE.replace("{length}", playlist.tracks.length).replace(
        "{name}",
        playlist.title
      )}`
    );

    return message.channel.send(embed);
  },
};
