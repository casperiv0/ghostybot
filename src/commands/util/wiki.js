const wiki = require("wikijs").default();
const BaseEmbed = require("../../modules/BaseEmbed");
module.exports = {
  name: "wiki",
  aliases: ["wikipediasearch", "wikipedia"],
  category: "util",
  description: "",
  async execute(bot, message, args) {
    const lang = await bot.getGuildLang(message.guild.id);
    if (!args[0]) {
      return message.channel.send(lang.GLOBAL.PROVIDE_ARGS);
    }

    const search = await wiki.search(args.join(" "));

    if (!search.results[0]) {
      return message.channel.send(lang.UTIL.NO_W_FOUND);
    }

    const result = await wiki.page(search.results[0]);
    const description = await result.summary();
    const title = result.raw.title;
    const url = result.raw.fullurl;

    const embed = BaseEmbed(message)
      .setTitle(`${title} (read more)`)
      .setURL(url)
      .setDescription(
        `${description.slice(0, 2045)}${description.length > 2048 ? "..." : ""}`
      );

    message.channel.send("", embed);
  },
};
