const BaseEmbed = require("../../modules/BaseEmbed");

module.exports = {
  name: "roles",
  description: "Get a random color",
  category: "util",
  execute(bot, message) {
    const roles =
      message.guild.roles.cache
        .filter((r) => r.id !== message.guild.id)
        .map((r) => r)
        .join(",\n") || "None";

    const embed = BaseEmbed(message).setTitle(`${message.guild.name}'s Roles`)
      .setDescription(`Roles:
${roles.length > 2048 ? roles.slice(0, 2048) + ".." : roles}`);

    message.channel.send(embed);
  },
};
