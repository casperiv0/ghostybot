const wd = require("word-definition");
const BaseEmbed = require("../../modules/BaseEmbed");

module.exports = {
  name: "define",
  description: "Define a word",
  category: "util",
  async execute(bot, message, args) {
    const word = args[0];

    if (!word) {
      return message.channel.send("Please provide a word");
    }

    wd.getDef(word.toLowerCase(), "en", null, (data) => {
      if (data.err) {
        message.channel.send(`No definition found for ${word}`);
      } else {
        const embed = BaseEmbed(message)
          .setTitle(`Definition for ${word}`)
          .addField("Category", data.category)
          .addField("definition", data.definition);

        message.channel.send(embed);
      }
    });
  },
};
