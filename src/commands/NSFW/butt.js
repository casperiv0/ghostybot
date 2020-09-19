const { MessageEmbed } = require("discord.js");
const fetch = require("node-fetch");

module.exports = {
  name: "butt",
  description: "None",
  category: "nsfw",
  async execute(bot, message) {
    if (!message.channel.nsfw)
      return message.channel.send("This channel is not a NSFW channel!");

    const data = await fetch(
      "http://api.obutts.ru/butts/0/1/random"
    ).then((res) => res.json());

    const embed = new MessageEmbed()
      .setFooter(message.author.username)
      .setColor("BLUE")
      .setDescription(
        `[Click here if the image failed to load.](http://media.obutts.ru/${data[0].preview})`
      )
      .setImage(`http://media.obutts.ru/${data[0].preview}`)
      .setTimestamp();

    message.channel.send(embed);
  },
};
