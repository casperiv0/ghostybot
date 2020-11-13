const randomGen = require("image-gen-discord");

module.exports = {
  name: "alpaca",
  description: "Shows a picture of a alpaca",
  category: "animal",
  execute(bot, message) {
    randomGen.alpaca(message, "message");
  },
};
