const fetch = require("node-fetch");
const BaseEmbed = require("../../modules/BaseEmbed");

module.exports = {
  name: "changemymind",
  description: "Change my mind",
  category: "image",
  async execute(bot, message, args) {
    const text = args.join(" ");

    if (!text) return message.channel.send("Please provide text");

    const sendMsg = await message.channel.send("⚙ Processing Image..");

    const data = await fetch(
      `https://nekobot.xyz/api/imagegen?type=changemymind&text=${text}`
    ).then((res) => res.json());

    sendMsg.delete();
    const embed = BaseEmbed(message)
      .setDescription(
        `[Click here if the image failed to load.](${data.message})`
      )
      .setImage(data.message);

    message.channel.send({ embed });
  },
};
