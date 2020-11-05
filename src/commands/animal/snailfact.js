const fetch = require("node-fetch");
const BaseEmbed = require("../../modules/BaseEmbed");

module.exports = {
  name: "snailfact",
  description: "Returns a snail fact",
  category: "animal",
  async execute(_bot, message) {
    fetch("https://cat-fact.herokuapp.com/facts?animal_type=snail")
      .then((res) => res.json())
      .then(async (data) => {
        const fact = data.all[Math.floor(Math.random() * data.all.length)];

        const embed = BaseEmbed(message)
          .setTitle("Snail Fact")
          .setDescription(fact.text);
        await message.channel.send(embed);
      });
  },
};
