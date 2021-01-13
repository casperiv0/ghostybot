const fetch = require("node-fetch");
const BaseEmbed = require("../../modules/BaseEmbed");

module.exports = {
  name: "changemymind",
  description: "Change my mind",
  category: "image",
  requiredArgs: ["text"],
  async execute(bot, message, args) {
    const lang = await bot.utils.getGuildLang(message.guild.id);
    const text = args.join(" ");

    const sendMsg = await message.channel.send(lang.UTIL.PROCESSING_IMAGE);

    const data = await fetch(
      `https://nekobot.xyz/api/imagegen?type=changemymind&text=${text}`
    ).then((res) => res.json());

    sendMsg.delete();
    const embed = BaseEmbed(message)
      .setDescription(
        `${lang.IMAGE.CLICK_TO_VIEW}(${data.message})`
      )
      .setImage(data.message);

    message.channel.send({ embed });
  },
};
