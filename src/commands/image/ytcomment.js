const { MessageEmbed } = require("discord.js");

module.exports = {
  name: "ytcomment",
  description: "Returns an image with your tweet",
  category: "image",
  async execute(bot, message, args) {
    const comment = args.join("%20");
    const username = message.author.username;
    const avatar = message.author.displayAvatarURL({ dynamic: false, format: 'png' });

    if (!comment) return message.channel.send("Please provide text");

    const sendMsg = await message.channel.send("⚙ Processing Image..");

    sendMsg.delete();
    const embed = new MessageEmbed()
      .setFooter(message.author.username)
      .setColor("BLUE")
      .setDescription(
        `[Click here if the image failed to load.](https://some-random-api.ml/canvas/youtube-comment?username=${username}&comment=${comment}&avatar=${avatar}&dark=false)`
      )
      .setImage(`https://some-random-api.ml/canvas/youtube-comment?username=${username}&comment=${comment}&avatar=${avatar}&dark=false`)
      .setTimestamp();

    message.channel.send({ embed });
  },
};
