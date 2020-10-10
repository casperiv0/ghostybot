const { MessageEmbed } = require("discord.js");

module.exports = {
  name: "imgfy",
  aliases: ["texttoimage"],
  description: "text to image converter xD",
  category: "image",
  async execute(bot, message, args) {
    const text = args.slice(0).join("%20");

    if (!text) {
      return message.channel.send("Please write some text");
    }

    const embed = new MessageEmbed()
      .setImage(`https://flamingtext.com/net-fu/proxy_form.cgi?script=3d-logo&text=${text}&_loc=generate&imageoutput=true`);

    message.channel.send(embed);
  },
};
