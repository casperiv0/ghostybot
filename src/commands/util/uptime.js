const moment = require("moment");

module.exports = {
  name: "uptime",
  description: "Returns the uptime of the bot",
  category: "util",
  aliases: ["up"],
  async execute(bot, message) {
    const lang = await bot.getGuildLang(message.guild.id);
    const uptime = moment
      .duration(bot.uptime)
      .format(" D [days], H [hrs], m [mins], s [secs]");

    return message.channel.send(
      lang.UTIL.UPTIME.replace("{member}", bot.user.username).replace(
        "{time}",
        uptime
      )
    );
  },
};
