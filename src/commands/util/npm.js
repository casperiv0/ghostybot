const fetch = require("node-fetch");
const BaseEmbed = require("../../modules/BaseEmbed");

module.exports = {
  name: "npm",
  description: "Search packages on npm by their name",
  category: "util",
  async execute(bot, message, args) {
    const query = args.join(" ");

    if (!query) {
      return message.channel.send("Please provide a query");
    }

    const data = await fetch(
      `http://registry.npmjs.com/-/v1/search?text=${query}&size=5`
    ).then((res) => res.json());

    const foundPackages = data.objects.map(({ package: pkg }) => pkg);

    const embed = BaseEmbed(message)
      .setTitle("NPM Search")
      .setDescription(`Top 5 found results for **${query}**`);

    foundPackages.forEach((pkg) => {
      embed.addField(
        pkg.name,
        `
        **Version:** ${pkg.version}
        **Author:** ${pkg?.publisher.username}
        [**View on npm**](${pkg.links.npm})
        `
      );
    });

    message.channel.send({ embed });
  },
};
