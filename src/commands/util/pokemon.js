const fetch = require("node-fetch");
const BaseEmbed = require("../../modules/BaseEmbed");

module.exports = {
  name: "pokemon",
  description: "Returns a pokemon information",
  category: "util",
  async execute(bot, message, args) {
    const query = args.join(" ");

    if (!query) return message.channel.send("Please provide a pokemon name!");

    try {
      const data = await fetch(
        `https://some-random-api.ml/pokedex?pokemon=${encodeURIComponent(
          query
        )}`
      ).then((res) => res.json());

      const embed = BaseEmbed(message)
        .setTitle(data.name)
        .setDescription(data.description)
        .addField("ID", data.id, true)
        .addField("Type", data.type, true)
        .addField("Species", data.species, true)
        .addField("Abilities", data.abilities, true)
        .addField("Height", data.height, true)
        .addField("Weight", data.weight, true)
        .addField("Experience", data.base_experience, true)
        .addField("Gender", data.gender, true)
        .addField("Egg Groups", data.egg_groups, true)
        .addField(
          "**Family:**",
          `**Evolution Stage:** ${data.family.evolutionStage} 
          **Evolution Line:** ${data.family.evolutionLine}`
        )
        .addField(
          "**Stats:**",
          `**HP:** ${data.stats.hp} 
          **Attack:** ${data.stats.attack} 
          **Defense:** ${data.stats.defense} 
          **SP ATK:** ${data.stats.sp_atk} 
          **SP DEF:** ${data.stats.sp_def} 
          **Speed:** ${data.stats.speed} 
          **Total:** ${data.stats.total}`
        )
        .setThumbnail(`${data.sprites.animated}`);

      message.channel.send({ embed });
    } catch (e) {
      return message.channel.send(
        `No pokemon was found with ${query}. Please use correct spelling and try again later.`
      );
    }
  },
};
