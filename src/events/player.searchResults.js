module.exports = {
  name: "searchResults",
  async execute(bot, message, query, tracks) {
    console.log(tracks);
    bot.player.play(message, tracks[0].url);
  },
};
