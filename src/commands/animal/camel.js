const randomGen = require("image-gen-discord");

module.exports = {
  name: "camel",
  description: "Shows a picture of a camel",
  category: "animal",
  execute(bot, message) {
    randomGen.camel(message, "message");
  },
};
