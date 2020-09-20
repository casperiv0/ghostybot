const { MessageEmbed } = require("discord.js");

module.exports = {
  name: "blowjob",
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

    const data = await bot.neko.nsfw.blowJob();

    const blowjob = new MessageEmbed()
      .setTitle("Blowjob")
      .setImage(data.url)
      .setColor("BLUE")
      .setURL(data.url);
    message.channel.send(blowjob);
  },
};
