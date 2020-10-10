const hastebin = require("hastebin-gen");

module.exports = {
  name: "hastebin",
  aliases: ["haste"],
  description: "Get a link of hastebin for your text",
  category: "util",
  usage: "hastbin <extension (js, ts, ...)> <code>",
  async execute(bot, message, args) {
    const extension = args[0];
    const code = args.slice(1).join(" ");

    if (!args.length) {
      return message.channel.send(
        "Please write your text or code to generate hastebin link"
      );
    }

    try {
      const haste = await hastebin(`${code}`, { extension: `${extension}` });

      message.channel.send(haste);
    } catch (e) {
      return message.channel.send(
        "Something went wrong, Please try again later."
      );
    }
  },
};
