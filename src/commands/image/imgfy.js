const BaseEmbed = require("../../modules/BaseEmbed");

module.exports = {
  name: "imgfy",
  aliases: ["texttoimage"],
  description: "text to image converter xD",
  category: "image",
  async execute(bot, message, args) {
    const text = args.join(" ");

    if (!text) {
      return message.channel.send("Please write some text");
    }

    const image = `https://flamingtext.com/net-fu/proxy_form.cgi?script=3d-logo&text=${encodeURIComponent(
      text
    )}&_loc=generate&imageoutput=true`;

    const embed = BaseEmbed(message)
      .setDescription(`[Click here if the image failed to load.](${image})`)
      .setImage(image);

    message.channel.send(embed);
  },
};
