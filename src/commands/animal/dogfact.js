const fetch = require("node-fetch");
const BaseEmbed = require("../../modules/BaseEmbed");

module.exports = {
  name: "dogfact",
  description: "Returns a dog fact",
  category: "animal",
  async execute(bot, message) {
    fetch("https://cat-fact.herokuapp.com/facts?animal_type=dog")
      .then((res) => res.json())
      .then(async (data) => {
        const fact = data.all[Math.floor(Math.random() * data.all.length)];

        const embed = BaseEmbed(message)
          .setTitle("Dog Fact")
          .setDescription(fact.text);
        await message.channel.send(embed);
      });
  },
};
