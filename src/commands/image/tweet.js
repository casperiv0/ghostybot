const fetch = require("node-fetch");
const BaseEmbed = require("../../modules/BaseEmbed");

module.exports = {
  name: "tweet",
  description: "Returns an image with your tweet",
  category: "image",
  async execute(bot, message, args) {
    const lang = await bot.getGuildLang(message.guild.id);
    const text = args.join(" ");
    const { username } = message.author;

    if (!text) {
      return message.channel.send("Please provide text");
    }

    const sendMsg = await message.channel.send("⚙ Processing Image..");

    const data = await fetch(
      `https://nekobot.xyz/api/imagegen?type=tweet&text=${encodeURIComponent(
        text
      )}&username=${username}`
    )
      .then((res) => res.json())
      .catch(() => {
        message.channel.send(lang.GLOBAL.ERROR);
      });

    sendMsg.delete();
    const embed = BaseEmbed(message)
      .setDescription(`${lang.IMAGE.CLICK_TO_VIEW}(${data.message})`)
      .setImage(data.message);

    message.channel.send({ embed });
  },
};
