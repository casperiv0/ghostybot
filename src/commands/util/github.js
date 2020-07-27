const fetch = require("node-fetch");
const { MessageEmbed } = require("discord.js");

module.exports = {
    name: "github",
    description: "Search someone on github",
    category: "util",
    aliases: ["gh"],
    async execute(bot, message, args) {
        const msg = await message.channel.send("Searching..");
        const username = args[0];
        const url = `https://api.github.com/users/${username}`;
        const result = await fetch(url).then(res => res.json());
        const user = result;

        if (user?.message === "Not Found") return message.channel.send("User not found")
            .then(() => msg.delete());

        msg.delete();

        const twitter = user.twitter_username ? `[@${user.twitter_username}](https://twitter.com/${user.twitter_username})` : "N/A";
        const website = user.blog ? user.blog : "N/A";
        const location = user.location ? user.location : "N/A";
        const bio = user.bio ? user.bio : "N/A";

        const embed = new MessageEmbed()
            .setAuthor(user.name)
            .setTitle(`${user.login}'s Profile`)
            .setDescription(`
            **Bio:** ${bio}
            **Twitter:** ${twitter}
            **Website:** ${website}
            **Location:** ${location}
            **Public Repos:** ${user.public_repos}
            `)
            .addField("**Followers**", user.followers)
            .addField("**Following**", user.following)
            .addField("Profile URL", user.html_url)
            .setColor("BLUE")
            .setThumbnail(user.avatar_url)
            .setFooter(message.author.username);


        message.channel.send(embed);
    }
};