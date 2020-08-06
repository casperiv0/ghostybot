const { MessageEmbed } = require("discord.js");
const { formatDate } = require("../../utils/functions");

module.exports = {
    name: "channelinfo",
    description: "Get information about a channel",
    category: "util",
    execute(bot, message, args) {
        let channel = message.mentions.channels.first();

        if (!channel) {
            if (parseInt(args[0]) < 9223372036854775807n) {
                channel = message.guild.channels.cache.get(args[0]);
            } else channel = message.channel;
        }

        const topic = channel.topic ? channel.topic : "No channel topic";
        const channelId = channel.id;
        const createdAt = formatDate(channel.createdAt);
        const type = channel.type === "text" ? "Text Channel" : "Voice Channel";

        const embed = new MessageEmbed()
            .setColor("BLUE")
            .setTitle(`${channel.name}'s info`)
            .addField("Type", type, true)
            .addField("Channel Topic", topic, true)
            .addField("Channel Id", channelId, true)
            .addField("Created At", createdAt, true)
            .setFooter(message.author.username)
            .setTimestamp();


        message.channel.send(embed);
    }
};