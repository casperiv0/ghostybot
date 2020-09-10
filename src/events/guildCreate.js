const { setServerPrefix, getServerPrefix } = require("../utils/functions");
const { MessageEmbed } = require("discord.js");
module.exports = {
    name: "guildCreate",
    async execute(bot, guild) {
        setServerPrefix(guild.id, "!");
        let channelID
        let channels = guild.channels.cache
        channelLoop:
        for (let c of channels) {
          let channelType = c[1].type
          if (channelType === "text") {
              channelID = c[0]
              break channelLoop
            }
        }  
        let currentPrefix = getServerPrefix(guild.id)
        let channel = bot.channels.cache.get(guild.systemChannelID || channelID);
        let welcomebed = new MessageEmbed()
        .setTitle('Thanks for inviting me!')
        .setDescription(`Get a list of my commands by doing ${currentPrefix}help`)
        channel.send(welcomebed);
    }
    }
