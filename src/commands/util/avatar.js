const { MessageEmbed } = require("discord.js");

module.exports = {
    name: "avatar",
    description: "Get user avatar",
    execute(bot, message, args) {
        if (!args[0]) return message.reply("Please provide a mention");

        const user = message.mentions.users.first() || message.author;
        const avatar = user.displayAvatarURL();

        const embed = new MessageEmbed()
            .setTitle(`${user.username}'s Avatar`)
            .setFooter(message.author.username)
            .setDescription(`Click __[Here](${avatar})__ to download`)
            .setImage(`${avatar}?sizes2048`, true)
            .setColor("BLUE")
            .setTimestamp();

        message.channel.send(embed);
    }
};