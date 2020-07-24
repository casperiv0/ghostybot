const { MessageEmbed } = require("discord.js");
const moment = require("moment-timezone");

module.exports = {
    name: "worldclock",
    description: "Shows the time from other countries",
    category: "util",
    execute(bot, message) {

        const newYork = moment.tz("America/New_York").format("hh:mm:ss");
        const LosAngelos = moment.tz("America/Los_Angeles").format("hh:mm:ss");
        const Toronto = moment.tz("America/Toronto").format("hh:mm:ss");
        const Chicago = moment.tz("America/Chicago").format("hh:mm:ss");
        const Belgium = moment.tz("Europe/Brussels").format("hh:mm:ss");
        const London = moment.tz("Europe/London").format("hh:mm:ss");
        const Paris = moment.tz("Europe/Paris").format("hh:mm:ss");
        const Berlin = moment.tz("Europe/Berlin").format("hh:mm:ss");
        const Tokyo = moment.tz("Asia/Tokyo").format("hh:mm:ss");
        const Perth = moment.tz("Australia/Perth").format("hh:mm:ss");
        const Sydney = moment.tz("Australia/Sydney").format("hh:mm:ss");
        const Rome = moment.tz("Europe/Rome").format("hh:mm:ss");
        const Singapore = moment.tz("Asia/Singapore").format("hh:mm:ss");

        const embed = new MessageEmbed()
            .setTitle("World time zones")
            .addField("Los Angeles, US", LosAngelos, true)
            .addField("New York, US", newYork, true)
            .addField("Chicago, US", Chicago, true)
            .addField("Toronto, Canada", Toronto, true)
            .addField("Brussels, Belgium", Belgium, true)
            .addField("London, UK", London, true)
            .addField("Berlin, Germany", Berlin, true)
            .addField("Paris, France", Paris, true)
            .addField("Rome, Italy", Rome, true)
            .addField("Tokyo, Japan", Tokyo, true)
            .addField("Singapore, Asia", Singapore, true)
            .addField("Perth, Australia", Perth, true)
            .addField("Australia, Sydney", Sydney, true)
            .setFooter(message.author.username)
            .setTimestamp()
            .setColor("BLUE");

        message.channel.send(embed);
    }
};