const { MessageEmbed } = require("discord.js");
const moment = require("moment");

module.exports = {
    name: "channelinfo",
    description: "Get information about a channel",
    execute(bot, message, args) {
        let channel = message.mentions.channels.first();

        if (!channel) {
            if (parseInt(args[0]) < 9223372036854775807n) {
                channel = message.guild.channels.cache.get(args[0]);
            } else channel = message.channel;
        }

        const topic = channel.topic ? channel.topic : "No channel topic";
        const channelId = channel.id;
        const createdAt = moment(channel.createdAt).format("MM/DD/YYYY");
        const type = channel.type === "text" ? "Text Channel" : "Voice Channel";

        const embed = new MessageEmbed()
            .setColor("BLUE")
            .setTitle(`${channel.name}'s info`)
            .addField("Type:", type)
            .addField("Channel Topic:", topic)
            .addField("Channel Id:", channelId)
            .addField("Created At:", createdAt)
            .setFooter(message.author.username)
            .setTimestamp();


        message.channel.send(embed);
    }
};