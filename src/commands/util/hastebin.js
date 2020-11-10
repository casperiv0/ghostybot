const hastebin = require("hastebin-gen");

module.exports = {
  name: "hastebin",
  aliases: ["haste"],
  description: "Get a link of hastebin for your text",
  category: "util",
  usage: "hastbin <extension (js, ts, ...)> <code>",
  async execute(bot, message, args) {
    const lang = await bot.getGuildLang(message.guild.id);
    const extension = args[0];
    const code = args.slice(1).join(" ");

    if (!extension) {
      return message.channel.send(lang.UTIL.PROVIDE_EXT);
    }

    if (!code) {
      return message.channel.send(lang.UTIL.PROVIDE_CODE);
    }

    try {
      const haste = await hastebin(`${code}`, { extension: `${extension}` });

      message.channel.send(haste);
    } catch (e) {
      return message.channel.send(lang.GLOBAL.ERROR);
    }
  },
};
