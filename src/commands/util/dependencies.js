const pkg = require("../../../package.json");
const BaseEmbed = require("../../modules/BaseEmbed");

module.exports = {
  name: "dependencies",
  description: "Shows a list of all bots dependencies",
  category: "util",
  execute(bot, message) {
    const dependencies = Object.entries(pkg.dependencies).join(",\n");

    const embed = BaseEmbed(message)
      .setTitle("All Dependencies")
      .setDescription(dependencies);

    message.channel.send(embed);
  },
};
