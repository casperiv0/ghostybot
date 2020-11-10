const { version } = require("discord.js");
const moment = require("moment");
const BaseEmbed = require("../../modules/BaseEmbed");

module.exports = {
  name: "botinfo",
  description: "Shows info about the bot",
  category: "util",
  aliases: ["bot"],
  async execute(bot, message) {
    const lang = await bot.getGuildLang(message.guild.id);
    const uptime = moment
      .duration(bot.uptime)
      .format(" D [days], H [hrs], m [mins], s [secs]");
    const nodev = process.version;
    const createdAt = moment(bot.user.createdAt).format("MM/DD/YYYY");

    const embed = BaseEmbed(message)
      .setTitle(`${lang.BOT.INFO_2}`)
      .addField(`${lang.MEMBER.ID}:`, bot.user.id)
      .addField(`${lang.MEMBER.USERNAME}:`, bot.user.username)
      .addField(
        `__**${lang.BOT.INFO}:**__`,
        `
**${lang.MEMBER.STATUS}:** ${bot.user.presence.status}
**${lang.BOT.USERS}:** +35000
**${lang.BOT.GUILDS}:** ${bot.guilds.cache.size}
**${lang.BOT.CHANNELS}:** ${bot.channels.cache.size}
**${lang.MEMBER.CREATED_ON}:** ${createdAt}
**${lang.BOT.COMMAND_COUNT}:** ${bot.commands.size}
**${lang.BOT.VC_CONNS}:** ${bot.voice.connections.size}
            `
      )
      .addField(
        `__**${lang.BOT.SYSTEM_INFO}**__`,
        `**${lang.BOT.RAM_USAGE}:**  ${(
          process.memoryUsage().heapUsed /
          1024 /
          1024
        ).toFixed(2)}MB
**${lang.BOT.UPTIME}:** ${uptime}
**${lang.BOT.NODE_V}:** ${nodev}
**${lang.BOT.DJS_V}:** ${version}`
      )
      .addField(
        `${lang.BOT.REPO}`,
        "https://github.com/dev-caspertheghost/ghostybot"
      )
      .addField(
        `${lang.UTIL.SUPPORT_SERVER}`,
        "https://discord.gg/XxHrtkA"
      )
      .setImage(
        "https://github.com/Dev-CasperTheGhost/ghostybot/raw/main/.github/Ghostybot-banner.png"
      );

    message.channel.send(embed);
  },
};
