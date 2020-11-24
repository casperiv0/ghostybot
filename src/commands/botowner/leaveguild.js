const { sendErrorLog } = require("../../utils/functions");

module.exports = {
  name: "leaveguild",
  description: "Leaves a guid by the provided Id",
  category: "botowner",
  ownerOnly: true,
  async execute(bot, message, args) {
    const lang = await bot.getGuildLang(message.guild.id);
    const guildId = args[0];

    if (!guildId) {
      return message.channel.send("Please provide an id");
    }

    const guild = bot.guilds.cache.find((g) => g.id === guildId);

    if (!guild) {
      return message.channel.send(lang.GUILD.NOT_FOUND);
    }

    try {
      await guild.leave();
      message.channel.send(lang.GUILD.LEFT.replace("{guild_name}", guild.name));
    } catch (e) {
      sendErrorLog(bot, e, "error");
      return message.channel.send(lang.GLOBAL.ERROR);
    }
  },
};
