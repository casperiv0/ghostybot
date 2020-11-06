const { MessageEmbed } = require("discord.js");

module.exports = {
  name: "unafk",
  aliases: ["unafkme", "deleteafk"],
  category: "util",
  description: "",
  async execute(bot, message) {
    if (!bot.afk.has(message.author.id)) {
      return message.channel.send("You are not already afk.");
    }

    let options = {
      justafk: false,
    };

    bot.afk.delete(message.author.id, options);

    const embed = new MessageEmbed()
      .setDescription("You are not afk anymore")
      .setColor("BLUE");

    message.channel.send(embed);
  },
};
