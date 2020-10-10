const { MessageEmbed } = require("discord.js");

module.exports = {
  name: "spank",
  category: "nsfw",
  usage: "None",
  async execute(bot, message) {
    //Checks channel for nsfw
    const errMessage = "This is not an NSFW Channel";
    if (!message.channel.nsfw) {
      return message.reply(errMessage).then((msg) => {
        msg.delete({ timeout: 3000 });
      });
    }

    const data = await bot.neko.nsfw.spank();

    const blowjob = new MessageEmbed()
      .setTitle("Spank")
      .setImage(data.url)
      .setColor("BLUE")
      .setURL(data.url);
    message.channel.send(blowjob);
  },
};
