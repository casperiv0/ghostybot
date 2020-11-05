const { removeGuild, removeUser } = require("../utils/functions");

module.exports = {
  name: "guildCreate",
  async execute(bot, guild) {
    await removeGuild(guild.id);

    guild.members.forEach(async (member) => {
      await removeUser(member.id, guild.id);
    });
  },
};
