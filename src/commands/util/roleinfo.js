const { MessageEmbed } = require("discord.js");
const moment = require("moment")

module.exports = {
    name: "roleinfo",
    description: "Shows info about a role",
    execute(bot, message, args) {
        const role = message.mentions.roles.first() ||
            message.guild.roles.cache.find(role => role.name === args[0]);

        if (!role) return message.channel.send("Couldn't find that role");

        const createdAt = moment(role.createdAt).format("MM/DD/YYYY");
        const mentionable = role.mentionable ? "Yes" : "No";
        const name = role.name;
        const id = role.id

        const embed = new MessageEmbed()
            .setTitle(`**${name}**`)
            .setColor("BLUE")
            .addField("Role info:", `
                **Created At:** ${createdAt}
                **Mentionable:** ${mentionable}
                **Id:** ${id}
            `)
            .setTimestamp()
            .setFooter(message.author.username)

        message.channel.send(embed)
    }
}