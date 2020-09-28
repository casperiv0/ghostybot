require("moment-duration-format");
const { version, MessageEmbed } = require("discord.js");
const moment = require("moment");

module.exports = {
  name: "botinfo",
  description: "Shows info about the bot",
  category: "util",
  aliases: ["bot"],
  execute(bot, message) {
    const uptime = moment
      .duration(bot.uptime)
      .format(" D [days], H [hrs], m [mins], s [secs]");
    const nodev = process.version;
    const createdAt = moment(bot.user.createdAt).format("MM/DD/YYYY");

    const embed = new MessageEmbed()
      .setColor("BLUE")
      .setFooter(message.author.username)
      .setTitle("Bot Information")
      .addField("Bot Id:", bot.user.id)
      .addField("Bot username:", bot.user.username)
      .addField(
        "__**Bot info:**__",
        `
**Status:** ${bot.user.presence.status}
**Users:** ${bot.users.cache.size}
**Servers:** ${bot.guilds.cache.size}
**Channels:** ${bot.channels.cache.size}
**Created on:** ${createdAt}
**Command Count:** ${bot.commands.size}
**Voice connections:** ${bot.voice.connections.size}
            `
      )
      .addField(
        "__**System Info**__",
        `**RAM Usage:**  ${(
          process.memoryUsage().heapUsed /
          1024 /
          1024
        ).toFixed(2)}MB
**Bot Uptime:** ${uptime}
**Node Version:** ${nodev}
**Discord.js version:** ${version}`
      )
      .addField(
        "Repository:",
        "https://github.com/dev-caspertheghost/ghostybot"
      )
      .addField("Support server", "https://discord.gg/XxHrtkA")
      .setImage(
        "https://github.com/Dev-CasperTheGhost/ghostybot/raw/master/.github/Ghostybot-banner.png"
      );

    message.channel.send(embed);
  },
};
