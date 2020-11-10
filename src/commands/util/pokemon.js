const fetch = require("node-fetch");
const BaseEmbed = require("../../modules/BaseEmbed");

module.exports = {
  name: "pokemon",
  description: "Returns a pokemon information",
  category: "util",
  async execute(bot, message, args) {
    const lang = await bot.getGuildLang(message.guild.id);
    const query = args.join(" ");

    if (!query) {
      return message.channel.send(lang.POKEMON.PROVIDE_NAME);
    }

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
        .addField(lang.POKEMON.SPECIES, data.species, true)
        .addField(lang.POKEMON.ABILITIES, data.abilities, true)
        .addField(lang.POKEMON.HEIGHT, data.height, true)
        .addField(lang.POKEMON.WEIGHT, data.weight, true)
        .addField(lang.POKEMON.EXPERIENCE, data.base_experience, true)
        .addField(lang.POKEMON.GENDER, data.gender, true)
        .addField(lang.POKEMON.EGG_GROUPS, data.egg_groups, true)
        .addField(
          `**${lang.POKEMON.FAMILY}:**`,
          `**${lang.POKEMON.EVO_STAGE}:** ${data.family.evolutionStage} 
          **${lang.POKEMON.EVO_LINE}:** ${data.family.evolutionLine}`
        )
        .addField(
          `**${lang.POKEMON.STATS}:**`,
          `**${lang.POKEMON.HP}:** ${data.stats.hp} 
          **${lang.POKEMON.ATTACK}:** ${data.stats.attack} 
          **${lang.POKEMON.DEFENSE}:** ${data.stats.defense} 
          **${lang.POKEMON.SP_ATK}:** ${data.stats.sp_atk} 
          **${lang.POKEMON.SP_DEF}:** ${data.stats.sp_def} 
          **${lang.POKEMON.SPEED}:** ${data.stats.speed} 
          **${lang.POKEMON.TOTAL}:** ${data.stats.total}`
        )
        .setThumbnail(`${data.sprites.animated}`);

      message.channel.send({ embed });
    } catch (e) {
      return message.channel.send(
        lang.POKEMON.NOT_FOUND.replace("{query}", query)
      );
    }
  },
};
