const fetch = require("node-fetch");
const { MessageEmbed } = require("discord.js");

module.exports = {
  name: "instagram",
  description: "Search someone on instagram",
  category: "util",
  aliases: ["ig"],
  async execute(bot, message, args) {
    const username = args[0];

    if (!username) {
      return message.channel.send("Please provide a username");
    }

    const url = `https://instagram.com/${username}/?__a=1`;
    let result;
    try {
      result = await fetch(url).then((res) => res.json());
    } catch (e) {
      return message.channel.send("The requested account was not found.");
    }

    if (!result.graphql) {
      return message.channel.send("The requested account was not found");
    }


    const account = result.graphql?.user;
    const isPrivate = account.is_private
      ? "Yes, this profile is private."
      : "Nope, this isn't private.";
    const isVerified = account.is_verified
      ? "Yes, this profile is verified."
      : "Nope, this profile isn't verified.";

    const embed = new MessageEmbed()
      .setAuthor(account.username)
      .setTitle(
        `${account.full_name ? account.full_name : account.username}'s Profile`
      )
      .setColor("BLUE")
      .addField("Private?", isPrivate, true)
      .addField("Verified?", isVerified, true)
      .addField("Followers Count", account.edge_followed_by.count, true)
      .addField("Following Count", account.edge_follow.count, true)
      .addField("External URL", account.external_url, true)
      .setDescription(`Bio: ${account.biography}`)
      .setThumbnail(account.profile_pic_url_hd)
      .setFooter(message.author.username);

    message.channel.send(embed);
  },
};
