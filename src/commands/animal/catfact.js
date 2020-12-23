const fetch = require("node-fetch");
const BaseEmbed = require("../../modules/BaseEmbed");

module.exports = {
  name: "catfact",
  description: "Returns a cat fact",
  category: "animal",
  async execute(bot, message) {
    const lang = await bot.getGuildLang(message.guild.id);
    fetch("https://some-random-api.ml/facts/cat")
      .then((res) => res.json())
      .then((data) => {
        const fact = data.fact;

        const embed = BaseEmbed(message).setTitle(lang.ANIMAL.CAT_FACT).setDescription(fact);
        message.channel.send(embed);
      });
  },
};
