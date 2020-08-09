const { setUserXp, addUserXp, getUserXp } = require("../../utils/functions");

module.exports = {
  name: "givexp",
  description: "Give someone Xp",
  category: "levels",
  async execute(bot, message, args) {
    const user = message.mentions.users.first();
    const xp = args.join(" ").slice(22);
    const usersXp = await getUserXp(message.guild.id, user.id);

    if (!message.member.hasPermission("MANAGE_MEMBERS"))
      return message.channel.send(
        "You don't have the correct permissions for that! (Manage Members)"
      );

    if (usersXp === null) {
      setUserXp(message.guild.id, user.id, Number(xp));
    } else {
      addUserXp(message.guild.id, user.id, Number(xp));
    }

    message.channel.send(`Successfully gave ${user} **${xp}**Xp`);
  },
};
