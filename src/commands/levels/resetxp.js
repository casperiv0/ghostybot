const { updateUserById } = require("../../utils/functions");

module.exports = {
  name: "resetxp",
  description: "reset all users xp for current server",
  category: "levels",
  usage: "resetxp all",
  async execute(bot, message) {
    if (!message.member.hasPermission("MANAGE_GUILD")) {
      return message.channel.send("You need Manage Guild permission");
    }

    const filter = (m) => message.author.id === m.author.id;

    message.channel.send("Reset All XP? y/n");

    message.channel
      .awaitMessages(filter, {
        time: 600000,
        max: 1,
        errors: ["time"],
      })
      .then(async (msgs) => {
        const msg = msgs.first();
        if (msg.content.toLowerCase() === "y") {
          const users = await message.guild.members.fetch();

          users.forEach(async (user) => {
            await updateUserById(user.id, message.guild.id, {
              xp: 0,
            });
          });

          message.channel.send("Successfully reset everyone's xp");
        } else {
          message.channel.send("resetxp was canceled");
        }
      })
      .catch((e) => {
        console.log(e);
        message.channel.send("An error occurred");
      });
  },
};
