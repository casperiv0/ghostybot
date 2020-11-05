const { MessageEmbed } = require("discord.js");
const { getUserById } = require("../../utils/functions");

module.exports = {
  name: "inventory",
  description: "View your or a user inventory",
  category: "economy",
  usage: "inventory <user>",
  aliases: ["inv"],
  async execute(bot, message) {
    const member = message.mentions.users.first() || message.author;
    const { user } = await getUserById(member.id, message.guild.id);
    const inventory = user?.inventory;

    if (!inventory || !inventory?.[0]) {
      return message.channel.send("User's inventory is empty");
    }

    const mapped = inventory?.map((item) => item).join(",\n ");

    const embed = new MessageEmbed()
      .setTitle(`${member.username}'s Inventory`)
      .setDescription(`${mapped}`)
      .setColor("BLUE")
      .setFooter(message.author.username)
      .setTimestamp();

    message.channel.send({ embed });
  },
};
