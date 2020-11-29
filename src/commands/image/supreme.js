const { MessageAttachment } = require("discord.js");

module.exports = {
  name: "supreme",
  description: "Display custom text as the Supreme logo",
  category: "image",
  async execute(bot, message, args) {
    const text = args.join(" ");

    if (!text) {
      return message.channel.send("Please provide text!");
    }

    const image = await bot.alexClient.image.supreme({
      text: encodeURIComponent(text),
    });

    const att = new MessageAttachment(image, "supreme.png");

    message.channel.send(att);
  },
};
