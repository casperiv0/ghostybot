const filters = require("../../data/filters.json");
const BaseEmbed = require("../../modules/BaseEmbed");

module.exports = {
  name: "filters",
  description: "All music filters",
  category: "music",
  async execute(bot, message) {
    const { prefix } = await bot.getGuildById(message.guild.id);

    const embed = BaseEmbed(message)
      .setTitle("Filters")
      .setDescription(`${filters.map((f) => `${f}`).join("\n")}\n **Use:** ${prefix}filter set <filter>`);

    return message.channel.send(embed);
  },
};
