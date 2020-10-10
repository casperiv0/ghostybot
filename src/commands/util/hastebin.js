const hastebin = require("hastebin-gen");

module.exports = {
  name: "hastebin",
  aliases: ["haste"],
  description: "Get a link of hastebin for your text",
  category: "util",
  async execute(bot, message, args) {
    const extaintion = args[0];
    const code = args.slice(1).join(" ");

    if (!args.length) {
      return message.channel.send("Please write your text or code to generate hastebin link");
    }

    try {
      const haste = await hastebin(`${code}`, { extension: `${extaintion}` });

      message.channel.send(haste);
    } catch (e) {
      return message.channel.send("Something went wrong, Please try again later.");
    }
  },
};
