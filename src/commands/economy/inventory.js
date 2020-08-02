const { MessageEmbed } = require("discord.js");
const { getUserInventory } = require("../../utils/functions");

module.exports = {
  name: "inventory",
  description: "View your or a user inventory",
  category: "economy",
  usage: "inventory <user>",
  async execute(bot, message) {
    const user = message.mentions.users.first() || message.author;
    const usersInventory = await getUserInventory(message.guild.id, user.id);

    if (usersInventory === null || !usersInventory[0])
      return message.channel.send("User's inventory is empty");

    const inventory = usersInventory.map((item) => item).join(",\n ");

    const embed = new MessageEmbed()
      .setTitle(`${user.username}'s Inventory`)
      .setDescription(`${inventory}`)
      .setColor("BLUE")
      .setFooter(message.author.username)
      .setTimestamp();

    message.channel.send({ embed });
  },
};
