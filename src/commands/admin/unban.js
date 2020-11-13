module.exports = {
  name: "unban",
  description: "unban a user by their id",
  category: "admin",
  botPermissions: ["BAN_MEMBERS"],
  memberPermissions: ["BAN_MEMBERS"],
  async execute(bot, message, args) {
    const userId = args[0];

    if (!userId) {
      return message.channel.send("Please provide a user id");
    }

    const bannedUser = await message.guild.members.unban(userId);

    message.channel.send(
      `**${bannedUser.username}** was successfully unbanned from the server.`
    );
  },
};
