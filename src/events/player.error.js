const { sendErrorLog } = require("../utils/functions");

module.exports = {
  name: "error",
  async execute(bot, error, message) {
    const lang = await bot.getGuildLang(message.guild.id);
    if (error === "UnableToJoin") {
      return message.channel.send(lang.MUSIC.JOIN_ERROR);
    } else {
      sendErrorLog(bot, { stack: error, name: "discord-player" }, "error");
      return message.channel.send(lang.GLOBAL.ERROR);
    }
  },
};
