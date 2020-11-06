const BaseEmbed = require("../../modules/BaseEmbed");

module.exports = {
  name: "membercount",
  description: "",
  category: "util",
  execute(bot, message) {
    const { name, memberCount } = message.guild;
    const bots = message.guild.members.cache.filter((mem) => mem.user.bot).size;
    const humans = message.guild.members.cache.filter((mem) => !mem.user.bot)
      .size;

    const embed = BaseEmbed(message)
      .setTitle(`${name}'s Members`)
      .addField("**Total**", memberCount, true)
      .addField("**Humans**", humans, true)
      .addField("**Bots**", bots, true);

    message.channel.send({ embed });
  },
};
