const { setUserXp, addUserXp, getUserXp } = require("../../utils/functions");

module.exports = {
  name: "givexp",
  description: "Give someone Xp",
  category: "levels",
  usage: "givexp <user> <amount>",
  async execute(bot, message, args) {
    let user = message.mentions.users.first();
    let xp = args.join(" ").slice(22);

    if (!user) {
      user = bot.users.cache.find((u) => u.id === args[0]);
      xp = args.join(" ").slice(18);
    }

    if (!user?.id) {
      return message.channel.send("User was not found");
    }

    const usersXp = await getUserXp(message.guild.id, user.id);

    if (!message.member.hasPermission("MANAGE_MEMBERS"))
      return message.channel.send(
        "You don't have the correct permissions for that! (Manage Members)"
      );

    if (usersXp === null) {
      setUserXp(message.guild.id, user.id, +xp);
    } else {
      addUserXp(message.guild.id, user.id, +xp);
    }

    message.channel.send(`Successfully gave ${user} **${xp}**Xp`);
  },
};
