const { MessageEmbed } = require("discord.js");
const wd = require("word-definition");


module.exports = {
    name: "define",
    description: "Define a word",
    category: "util",
    async execute(bot, message, args) {
        const word = args[0].toLowerCase();

        wd.getDef(word, "en", null, (data) => {
            if (data.err) {
                message.channel.send(`No definition found for ${word}`);
            } else {
                const embed = new MessageEmbed()
                    .setTitle(`Definition for ${word}`)
                    .addField("Category", data.category)
                    .addField("definition", data.definition)
                    .setTimestamp()
                    .setFooter(message.author.username);

                message.channel.send(embed);
            }
        });
    }
};