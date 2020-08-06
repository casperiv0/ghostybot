const { MessageEmbed } = require("discord.js");

module.exports = {
  name: "membercount",
  description: "",
  category: "util",
  execute(bot, message) {
    const { name, memberCount } = message.guild;
    const bots = message.guild.members.cache.filter((mem) => mem.user.bot).size;
    const humans = message.guild.members.cache.filter((mem) => !mem.user.bot).size;

    const embed = new MessageEmbed()
      .setTitle(`${name}'s Members`)
      .setColor("BLUE")
      .setFooter(message.author.username)
      .setTimestamp()
      .addField("**Total**", memberCount, true)
      .addField("**Humans**", humans, true)
      .addField("**Bots**", bots, true);

    message.channel.send({ embed });
  },
};
