/* eslint-disable no-case-declarations */
const { ownerId } = require("../../../config.json");
const { MessageEmbed } = require("discord.js");
const User = require("../../models/User.model");

module.exports = {
  name: "blacklist",
  description: "Remove/add blacklist from a user",
  category: "botowner",
  usage: "blacklist <option> <level> <user>",
  options: ["add", "remove", "view"],
  ownerOnly: true,
  async execute(bot, message, args) {
    const type = args[0];
    const member =
      message.mentions.users.first() ||
      bot.users.cache.find((user) => user.id === args[1]);

    if (!type) {
      return message.channel.send("Please provide a type");
    }

    if (!member) {
      return message.channel.send("Please provide a valid user");
    }

    if (member.id === ownerId) {
      return message.channel.send("Cannot blacklist the owner");
    }

    const users = await User.find({ blacklisted: true });

    switch (type) {
      case "view":
        const usr = users.find((u) => u.user_id === member.id);

        if (!usr) {
          return message.channel.send("User is not blacklisted");
        }

        const embed = new MessageEmbed()
          .setTitle(`Blacklist status: ${member.username}`)
          .setColor("BLUE")
          .setTimestamp()
          .addField("Blacklist level", "2");

        return message.channel.send({ embed });
      case "add":
        const existing = users.filter((u) => u.user_id === member.id)[0];
        if (existing) {
          return message.channel.send(`${member.tag} is already blacklisted`);
        }

        const foundUsers = await User.find({ user_id: member.id });

        foundUsers.forEach(async (user) => {
          await User.findByIdAndUpdate(user._id, { blacklisted: true });
        });
        break;
      case "remove": {
        if (users === null) {
          return message.channel.send(`${member.tag} is not blacklisted`);
        }
        const exists = users.find((u) => u.user_id === member.id);
        if (!exists) {
          return message.channel.send(`${member.tag} is not blacklisted`);
        }

        const foundUsers = await User.find({ user_id: member.id });

        foundUsers.forEach(async (user) => {
          await User.findByIdAndUpdate(user._id, { blacklisted: false });
        });
        break;
      }
      default: {
        return message.channel.send(`**${type}** is not an option`);
      }
    }
    return message.channel.send(
      `${member.tag} was ${type === "add" ? "blacklisted" : "unblacklisted"}`
    );
  },
};
