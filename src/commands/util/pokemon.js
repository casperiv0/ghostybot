const { MessageEmbed } = require("discord.js");
const fetch = require("node-fetch");

module.exports = {
  name: "pokemon",
  description: "Returns a pokemon information",
  category: "util",
  async execute(bot, message, args) {
    const query = args.join("%20");

    if (!query) return message.channel.send("Please provide a pokemon name !");

    try {
      const data = await fetch(`https://some-random-api.ml/pokedex?pokemon=${query}`).then(res => res.json());

      const embed = new MessageEmbed()
        .setFooter(message.author.username)
        .setTitle(data.name)
        .setColor("RANDOM")
        .setDescription(data.description)
        .addField("ID", data.id)
        .addField("Type", data.type)
        .addField("Species", data.species)
        .addField("Abilities", data.abilities)
        .addField("Height", data.height)
        .addField("Weight", data.weight)
        .addField("Experience", data.base_experience)
        .addField("Gender", data.gender)
        .addField("Egg Groups", data.egg_groups)
        .addField("**Family :-**", `**Evolution Stage :** ${data.family.evolutionStage} \n**Evolution Line :** ${data.family.evolutionLine} `)
        .addField("**Stats :-**", `**HP :** ${data.stats.hp} \n**Attack :** ${data.stats.attack} \n**Defense: ** ${data.stats.defense} \n**SP ATK :** ${data.stats.sp_atk} \n**SP DEF :** ${data.stats.sp_def} \n**Speed :** ${data.stats.speed} \n**Total :** ${data.stats.total} `)
        .setThumbnail(`${data.sprites.animated}`)
        .setTimestamp();

      message.channel.send({ embed });
    } catch (e) {
      return message.channel.send(`No pokemon was found with ${query}. Please use correct spelling and try again later.`);
    }
  },
};
