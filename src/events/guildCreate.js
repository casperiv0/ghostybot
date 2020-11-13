const { addGuild } = require("../utils/functions");

module.exports = {
  name: "guildCreate",
  async execute(bot, guild) {
    await addGuild(guild.id);
  },
};
