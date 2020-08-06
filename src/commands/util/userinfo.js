const { MessageEmbed } = require("discord.js");
const { formatDate } = require("../../utils/functions");

module.exports = {
    name: "userinfo",
    description: "Get user info",
    usage: "!userinfo <user>",
    category: "util",
    aliases: ["whois"],
    async execute(bot, message, args) {
        // if (!args[0]) return message.reply("Please provide a user mention");
        const member = message.guild.members.cache.get(args.join(" ")) || message.mentions.members.first() || message.member;

        if (!member)
            return message.channel.send("User wasn't found!");

        const joinedAt = formatDate(member.user.joinedAt);
        const createdAt = formatDate(member.user.createdAt);
        const roles = member.roles.cache
            .filter(r => r.id !== message.guild.id)
            .map(r => r)
            .join(", ") || "None";
        const { username, id, tag } = member.user;

        const embed = new MessageEmbed()
            .addField("User Information", `
**Id:** ${id}
**Username:** ${username}
**Tag:** ${tag}
**Created At:** ${createdAt}
**Joined At:** ${joinedAt}
**Roles:** ${roles}
            `)
            .setTitle(`${username}'s info`)
            .setColor("BLUE")
            .setTimestamp()
            .setFooter(message.author.username);

        message.channel.send(embed);
    }
};