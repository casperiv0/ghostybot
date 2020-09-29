/* eslint-disable no-constant-condition */
/* eslint-disable no-case-declarations */
const {
  addBlacklistUser,
  getBlacklistUsers,
  setBlacklistUsers,
} = require("../../utils/functions");
const { ownerId } = require("../../../config.json");
const { MessageEmbed } = require("discord.js");

module.exports = {
  name: "blacklist",
  description: "Remove/add blacklist from a user",
  category: "botowner",
  usage: "blacklist <option> <level> <user>",
  options: ["add", "remove", "view"],
  ownerOnly: true,
  async execute(bot, message, args) {
    const levels = ["1", "2"];
    const type = args[0];
    const level = args[1];
    const user =
      bot.users.cache.find((user) => user.id === args[2]) ||
      message.mentions.users.first();

    if (!type) {
      return message.channel.send("Please provide a type");
    }

    if (!level) {
      return message.channel.send("Please provide a level (1 or 2)");
    }

    if (!user) {
      return message.channel.send("Please provide a valid user");
    }

    if (user.id === ownerId) {
      return message.channel.send("Cannot blacklist the owner");
    }

    const users = await getBlacklistUsers();

    switch (type) {
      case "view":
        const usr =
          users !== null && users.filter((u) => u.user.id === user.id)[0];

        if (!usr) {
          return message.channel.send("User is not blacklisted");
        }

        const embed = new MessageEmbed()
          .setTitle(`Blacklist status: ${usr.user.username}`)
          .setColor("BLUE")
          .setTimestamp()
          .addField("Blacklist level", usr.level ? usr.level : "0");

        return message.channel.send({ embed });
      case "add":
        if (!levels.includes(level)) {
          return message.channel.send("Level can only be **1** or **2**");
        }
        if (users === null) {
          return setBlacklistUsers([user]);
        }
        const existing =
          users !== null && users.filter((u) => u.user.id === user.id)[0];
        if (existing) {
          return message.channel.send(`${user.tag} is already blacklisted`);
        }

        addBlacklistUser({ user, level });
        break;
      case "remove":
        if (users === null) {
          return message.channel.send(`${user.tag} is not blacklisted`);
        }
        const exists = getBlacklistUsers()?.filter(
          (u) => u.user.id === user?.id
        )[0];
        if (!exists) {
          return message.channel.send(`${user.tag} is not blacklisted`);
        }
        const blacklisted = getBlacklistUsers().filter(
          (u) => u.user.id !== user?.id
        );
        setBlacklistUsers(blacklisted);
        break;
      default: {
        return message.channel.send(`**${type}** is not an option`);
      }
    }
    return message.channel.send(
      `${user.tag} was ${type === "add" ? "blacklisted" : "unblacklisted"}`
    );
  },
};
