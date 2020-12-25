const { version } = require("discord.js");
const moment = require("moment");
const BaseEmbed = require("../../modules/BaseEmbed");
const {
  dashboard: { dashboardUrl },
} = require("../../../config.json");

module.exports = {
  name: "botinfo",
  description: "Shows info about the bot",
  category: "util",
  aliases: ["bot"],
  async execute(bot, message) {
    const lang = await bot.getGuildLang(message.guild.id);
    const uptime = moment.duration(bot.uptime).format(" D [days], H [hrs], m [mins], s [secs]");
    const nodev = process.version;

    const embed = BaseEmbed(message)
      .setTitle(`${lang.BOT.INFO_2}`)
      .addField(`${lang.MEMBER.USERNAME}:`, bot.user.username)
      .addField(
        `__**${lang.BOT.INFO}:**__`,
        `
**${lang.BOT.USERS}:** ${bot.formatNumber(bot.users.cache.size)}
**${lang.BOT.GUILDS}:** ${bot.formatNumber(bot.guilds.cache.size)}
**${lang.BOT.CHANNELS}:** ${bot.formatNumber(bot.channels.cache.size)}
**${lang.BOT.COMMAND_COUNT}:** ${bot.commands.size}
**${lang.BOT.VC_CONNS}:** ${bot.voice.connections.size}
            `,
        true
      )
      .addField(
        `__**${lang.BOT.SYSTEM_INFO}**__`,
        `**${lang.BOT.RAM_USAGE}:**  ${(process.memoryUsage().heapUsed / 1024 / 1024).toFixed(2)}MB
**${lang.BOT.UPTIME}:** ${uptime}
**${lang.BOT.NODE_V}:** ${nodev}
**${lang.BOT.DJS_V}:** ${version}`,
        true
      )
      .addField(
        "Links",
        `
[${lang.BOT.DEVELOPER}](https://caspertheghost.me)
[${lang.BOT.CONTRIBUTORS}](https://github.com/Dev-CasperTheGhost/ghostybot/contributors)
[${lang.BOT.INVITE_BOT}](https://discord.com/oauth2/authorize?client_id=${bot.user.id}&scope=bot&permissions=8)`,
        true
      )
      .addField(
        `${lang.BOT.REPO}`,
        "[Click Here](https://github.com/dev-caspertheghost/ghostybot)",
        true
      )
      .addField(`${lang.UTIL.SUPPORT_SERVER}`, "[Click Here](https://discord.gg/XxHrtkA)", true)
      .addField(`${lang.BOT.DASHBOARD}`, `[Click Here](${dashboardUrl})`, true)
      .setImage(
        "https://raw.githubusercontent.com/Dev-CasperTheGhost/ghostybot/main/.github/Ghostybot-banner.png"
      );

    message.channel.send(embed);
  },
};
