const fetch = require("node-fetch");
const { MessageEmbed } = require("discord.js");

module.exports = {
    name: "instagram",
    description: "Search someone on instagram",
    async execute(bot, message, args) {
        const username = args[0];
        const url = `https://instagram.com/${username}/?__a=1`;
        const result = await fetch(url).then(res => res.json());
        const account = result.graphql.user;

        if (!account) return message.channel.send("User not found");

        const embed = new MessageEmbed()
            .setAuthor(account.username)
            .setDescription(`Bio: ${account.biography}`)
            .setColor("BLUE")
            .addField("Private?", account.is_private
                ? "Yes, this profile is private."
                : "Nope, this isn't private.")
            .addField("Verified?", account.is_verified
                ? "Yes, this profile is verified."
                : "Nope, this profile isn't verified."
            )
            .setTitle(`${account.full_name ? account.full_name : account.username} 's Profile`)
            .addField("Followers Count", account.edge_followed_by.count)
            .setThumbnail(account.profile_pic_url_hd)
            .setFooter(message.author.username);


        message.channel.send(embed);
    }
}