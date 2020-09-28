/* eslint-disable no-case-declarations */
const {
  addBlacklistUser,
  getBlacklistUsers,
  setBlacklistUsers,
} = require("../../utils/functions");


module.exports = {
  name: "blacklist",
  description: "Remove/add blacklist from a user",
  category: "botowner",
  options: ["add", "remove", "view"],
  ownerOnly: true,
  execute(bot, message, args) {


    const type = args[0];
    const user =
      bot.users.cache.find((user) => user.id === args[1]) ||
      message.mentions.users.first();

    if (!type) {
      return message.channel.send("Please provide a type");
    }

    if (!user) {
      return message.channel.send("Please provide a valid user");
    }

    if (user.id === ownerId) {
      return message.channel.send("Cannot blacklist the owner");
    }

    switch (type) {
      case "add":
        const existing = getBlacklistUsers().filter((u) => u.id === user.id)[0];
        if (existing) {
          return message.channel.send(`${user.tag} is already blacklisted`);
        }
        addBlacklistUser(user);
        break;
      case "remove":
        const exists = getBlacklistUsers().filter((u) => u.id === user?.id)[0];
        if (!exists) {
          return message.channel.send(`${user.tag} is not blacklisted`);
        }
        const blacklisted = getBlacklistUsers().filter(
          (u) => u.id !== user?.id
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
