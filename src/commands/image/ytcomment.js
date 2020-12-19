const BaseEmbed = require("../../modules/BaseEmbed");

module.exports = {
  name: "ytcomment",
  description: "Returns an image with your YouTube comment",
  category: "image",
  usage: "ytcomment <my amazing youtube comment>",
  requiredArgs: ["comment"],
  async execute(bot, message, args) {
    const lang = await bot.getGuildLang(message.guild.id);
    const comment = args.join(" ");
    const username = message.author.username;
    const avatar = message.author.displayAvatarURL({
      dynamic: false,
      format: "png",
    });

    const sendMsg = await message.channel.send("⚙ Processing Image..");

    sendMsg.delete();
    const url = `https://some-random-api.ml/canvas/youtube-comment?username=${encodeURIComponent(
      username
    )}&comment=${encodeURIComponent(comment)}&avatar=${encodeURIComponent(avatar)}`;

    const embed = BaseEmbed(message)
      .setDescription(`${lang.IMAGE.CLICK_TO_VIEW}(${url})`)
      .setImage(url);

    message.channel.send({ embed });
  },
};
