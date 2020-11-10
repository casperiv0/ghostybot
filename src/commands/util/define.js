const wd = require("word-definition");
const BaseEmbed = require("../../modules/BaseEmbed");

module.exports = {
  name: "define",
  description: "Define a word",
  category: "util",
  async execute(bot, message, args) {
    const lang = await bot.getGuildLang(message.guild.id);
    const word = args[0];

    if (!word) {
      return message.channel.send(lang.GLOBAL.PROVIDE_ARGS);
    }

    wd.getDef(word.toLowerCase(), "en", null, (data) => {
      if (data.err) {
        message.channel.send(
          lang.UTIL.NO_DEF_FOUND.replace("{word}", word)
        );
      } else {
        const embed = BaseEmbed(message)
          .setTitle(lang.UTIL.DEF_FOR_WORD.replace("{word}", word))
          .addField(lang.UTIL.CATEGORY, data.category)
          .addField(lang.UTIL.DEFINITION, data.definition);

        message.channel.send(embed);
      }
    });
  },
};
