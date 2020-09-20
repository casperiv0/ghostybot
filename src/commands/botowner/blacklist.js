/* eslint-disable no-case-declarations */
const {
  addBlacklistUser,
  getBlacklistUsers,
  setBlacklistUsers,
} = require("../../utils/functions");
const { ownerId } = require("../../../config.json");

module.exports = {
  name: "blacklist",
  description: "Remove/add blacklist from a user",
  category: "botowner",
  options: ["add", "remove", "view"],
  async execute(bot, message, args) {
    if (message.author.id !== ownerId)
      return message.reply("Only the owner is allowed to run this command");

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

    const users = await getBlacklistUsers();

    switch (type) {
      case "add":
        if (users === null) {
          return setBlacklistUsers([user]);
        }
        const existing =
          users !== null && users.filter((u) => u.id === user.id)[0];
        if (existing) {
          return message.channel.send(`${user.tag} is already blacklisted`);
        }

        addBlacklistUser(user);
        break;
      case "remove":
        if (users === null) {
          return message.channel.send(`${user.tag} is not blacklisted`);
        }
        const exists = getBlacklistUsers()?.filter((u) => u.id === user?.id)[0];
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
