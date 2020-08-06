const fetch = require("node-fetch");
const { MessageEmbed } = require("discord.js");

module.exports = {
  name: "github",
  description: "Search someone on github",
  category: "util",
  aliases: ["gh"],
  async execute(bot, message, args) {
    const username = args[0];

    if (!username) return message.channel.send("Please provide a username!");

    const msg = await message.channel.send("Searching..");
    const url = `https://api.github.com/users/${username}`;
    const result = await fetch(url).then((res) => res.json());
    const user = result;

    if (user?.message === "Not Found")
      return message.channel.send("User not found").then(() => msg.delete());

    msg.delete();

    const twitter = user.twitter_username
      ? `[@${user.twitter_username}](https://twitter.com/${user.twitter_username})`
      : "N/A";
    const website = user.blog ? user.blog : "N/A";
    const location = user.location ? user.location : "N/A";
    const bio = user.bio ? user.bio : "N/A";

    const embed = new MessageEmbed()
      .setAuthor(user.name)
      .setTitle(`${user.login}'s Profile`)
      .addField("**Twitter**", twitter, true)
      .addField("**Following**", user.following, true)
      .addField("**Followers**", user.followers, true)
      .addField("**Website**", website, true)
      .addField("**Location**", location, true)
      .addField("Profile URL", user.html_url)
      .setDescription(`Bio: ${bio}`)
      .setColor("BLUE")
      .setThumbnail(user.avatar_url)
      .setFooter(message.author.username);

    message.channel.send(embed);
  },
};
