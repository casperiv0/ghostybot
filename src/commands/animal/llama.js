const randomGen = require("image-gen-discord");

module.exports = {
  name: "llama",
  description: "Shows a picture of a llama",
  category: "animal",
  execute(bot, message) {
    randomGen.lama(message, "message");
  },
};
