const BaseEmbed = require("../../modules/BaseEmbed");

module.exports = {
  name: "supreme",
  description: "Display custom text as the Supreme logo",
  category: "image",
  execute(bot, message, args) {
    const text = args.join(" ");

    if (!text) return message.channel.send("Please provide text!");

    const image = `https://api.alexflipnote.dev/supreme?text=${encodeURIComponent(
      text
    )}`;

    const embed = BaseEmbed(message)
      .setDescription(`[Click here if the image failed to load.](${image})`)
      .setImage(image);

    message.channel.send(embed);
  },
};
