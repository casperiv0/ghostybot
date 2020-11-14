module.exports = {
  name: "searchResults",
  async execute(bot, message, query, tracks) {
    bot.player.play(message, tracks[0].url);
  },
};
