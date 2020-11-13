const fetch = require("node-fetch");
const BaseEmbed = require("../../modules/BaseEmbed");

module.exports = {
  name: "snailfact",
  description: "Returns a snail fact",
  category: "animal",
  async execute(bot, message) {
    const lang = await bot.getGuildLang(message.guild.id);
    fetch("https://cat-fact.herokuapp.com/facts?animal_type=snail")
      .then((res) => res.json())
      .then(async (data) => {
        const fact = data.all[Math.floor(Math.random() * data.all.length)];

        const embed = BaseEmbed(message)
          .setTitle(lang.ANIMAL.SNAIL_FACT)
          .setDescription(fact.text);
        await message.channel.send(embed);
      });
  },
};
