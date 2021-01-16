const pkg = require("../../../package.json");
const BaseEmbed = require("../../modules/BaseEmbed");

module.exports = {
  name: "dependencies",
  description: "Shows a list of all bots dependencies",
  category: "util",
  async execute(bot, message) {
    const lang = await bot.utils.getGuildLang(message.guild?.id);
    const dependencies = Object.entries(pkg.dependencies).join(",\n");

    const embed = bot.utils.baseEmbed(message)
      .setTitle(lang.UTIL.DEPENDENCIES)
      .setDescription(dependencies);

    message.channel.send(embed);
  },
};
