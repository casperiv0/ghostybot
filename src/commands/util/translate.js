const { MessageEmbed } = require("discord.js");
const translate = require("@k3rn31p4nic/google-translate-api");

module.exports = {
    name: "translate",
    description: "Translate a sentence",
    usage: "!translate <language> <sentence>",
    category: "util",
    async execute(bot, message, args) {
        const result = await translate(args.slice(1).join(" "), { to: args[0] });

        const embed = new MessageEmbed()
            .setDescription(result.text)
            .setColor("BLUE")
            .setFooter(message.author.username)
            .setTimestamp()
            .setTitle("Google Translate");

        message.channel.send(embed);
    }
};