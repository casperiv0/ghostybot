module.exports = {
  name: "membercount",
  description: "",
  category: "util",
  execute(bot, message) {
    const { name, memberCount } = message.guild;

    return message.channel.send(`**${name}** has **${memberCount}** members`);
  },
};
