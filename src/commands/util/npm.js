const fetch = require("node-fetch");
const BaseEmbed = require("../../modules/BaseEmbed");

module.exports = {
  name: "npm",
  description: "Search packages on npm by their name",
  category: "util",
  async execute(bot, message, args) {
    const lang = await bot.getGuildLang(message.guild.id);
    const query = args.join(" ");

    if (!query) {
      return message.channel.send(lang.GLOBAL.PROVIDE_ARGS);
    }

    const data = await fetch(
      `http://registry.npmjs.com/-/v1/search?text=${query}&size=5`
    ).then((res) => res.json());

    const foundPackages = data.objects.map(({ package: pkg }) => pkg);

    const embed = BaseEmbed(message)
      .setTitle(lang.UTIL.NPM_SEARCH)
      .setDescription(lang.UTIL.NPM_TOP_5.replace("{query}", query));

    foundPackages.forEach((pkg) => {
      embed.addField(
        pkg.name,
        `
        **${lang.UTIL.VERSION}:** ${pkg.version}
        **${lang.UTIL.AUTHOR}:** ${pkg?.publisher.username}
        [**${lang.UTIL.VIEW_ON_NPM}**](${pkg.links.npm})
        `
      );
    });

    message.channel.send({ embed });
  },
};
