const joke = require("one-liner-joke").getRandomJoke;

module.exports = {
  name: "randomjoke",
  description: "returns a random joke",
  category: "games",
  execute(bot, message) {
    message.channel.send(
      joke({ exclude_tags: ["dirty", "racist", "marriage", "sex", "death"] })
        .body
    );
  },
};
