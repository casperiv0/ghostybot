const { MessageEmbed } = require("discord.js");
const moment = require("moment");

module.exports = {
    name: "userinfo",
    description: "Get user info",
    usage: "!userinfo <user>",
    aliases: ["whois"], 
    async execute(bot, message, args) {
        if (!args[0]) return message.reply("Please provide a user mention");
        const member = message.guild.members.cache.get(args.join(" ")) || message.mentions.members.first();

        const joinedAt = moment(member.user.joinedAt).format("MM/DD/YYYY");
        const createdAt = moment(member.user.createdAt).format("MM/DD/YYYY");
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