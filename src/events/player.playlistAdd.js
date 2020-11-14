const BaseEmbed = require("../modules/BaseEmbed");

module.exports = {
  name: "playlistAdd",
  async execute(bot, message, queue, playlist) {
    const lang = await bot.getGuildLang(message.guild.id);
    console.log("queue:", queue);
    console.log("playlist", playlist);

    const embed = BaseEmbed(message).setTitle(
      `${lang.MUSIC.ADDED_PL_TO_QUEUE.replace("{length}", playlist)}`
    );
    //   .setAuthor(`${lang.MUSIC.REQUESTED_BY} ${track.requestedBy.username}`)
    //   .setImage(track.thumbnail);

    return message.channel.send(embed);
  },
};
