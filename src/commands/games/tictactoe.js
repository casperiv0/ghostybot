const { tictactoe: TicTacToe } = require("easy-games-js");

module.exports = {
  name: "tictactoe",
  description: "Play a game of tictactoe",
  category: "games",
  requiredArgs: ["member"],
  aliases: ["ttt", "tttoe"],
  async execute(bot, message, args) {
    const member = bot.findMember(message, args);
    const ticTacToe = new TicTacToe(member, message);

    ticTacToe.init();
  },
};
