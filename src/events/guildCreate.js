const { setServerPrefix, getServerPrefix } = require("../utils/functions");
const { MessageEmbed } = require("discord.js");
module.exports = {
  name: "guildCreate",
  async execute(bot, guild) {
    setServerPrefix(guild.id, "!");
    let channelID;
    const channels = guild.channels.cache;
    channelLoop: for (let c of channels) {
      const channelType = c[1].type;
      if (channelType === "text") {
        channelID = c[0];
        break channelLoop;
      }
    }
    
    const currentPrefix = getServerPrefix(guild.id);
    const channel = bot.channels.cache.get(guild.systemChannelID || channelID);
    const welcomebed = new MessageEmbed()
      .setTitle("Thanks for inviting me!")
      .setColor("BLUE")
      .setDescription(
        `Get a list of my commands by doing ${currentPrefix}help`
      );
    channel.send(welcomebed);
  },
};
