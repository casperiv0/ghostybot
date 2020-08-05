const { MessageEmbed } = require("discord.js");
const fetch = require("node-fetch");

module.exports = {
  name: "npm",
  description: "Search packages on npm by their name",
  category: "util",
  async execute(bot, message, args) {
    const query = args.join(" ");
    const data = await fetch(
      `http://registry.npmjs.com/-/v1/search?text=${query}&size=10`
    ).then((res) => res.json());

    const foundPackages = data.objects
      .map(({ package: pkg }) => `[${pkg.name}](${pkg.links.npm})`)
      .join("\n");
    const embed = new MessageEmbed()
      .setTitle("NPM Search")
      .setColor("BLUE")
      .setDescription(`Top 10 results: \n${foundPackages}`);

    message.channel.send({ embed });
  },
};
