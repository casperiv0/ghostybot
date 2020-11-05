const fetch = require("node-fetch");
const BaseEmbed = require("../../modules/BaseEmbed");

module.exports = {
  name: "catfact",
  description: "Returns a cat fact",
  category: "animal",
  async execute(bot, message) {
    fetch("https://cat-fact.herokuapp.com/facts?animal_type=cat")
      .then((res) => res.json())
      .then(async (data) => {
        const fact = data.all[Math.floor(Math.random() * data.all.length)];

        const embed = BaseEmbed(message)
          .setTitle("Cat Fact")
          .setDescription(fact.text);
        await message.channel.send(embed);
      });
  },
};
