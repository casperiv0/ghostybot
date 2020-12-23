const fetch = require("node-fetch");
const BaseEmbed = require("../../modules/BaseEmbed");

module.exports = {
  name: "dogfact",
  description: "Returns a dog fact",
  category: "animal",
  async execute(bot, message) {
    const lang = await bot.getGuildLang(message.guild.id);
    fetch("https://some-random-api.ml/facts/dog")
      .then((res) => res.json())
      .then((data) => {
        const fact = data.fact;

        const embed = BaseEmbed(message)
          .setTitle(lang.ANIMAL.DOG_FACT)
          .setDescription(fact);
        message.channel.send(embed);
      });
  },
};
