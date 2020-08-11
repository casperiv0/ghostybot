const { MessageEmbed } = require("discord.js");
const math = require("mathjs");

module.exports = {
    name: "calc",
    description: "Calculate something",
    category: "games",
    aliases: ["math"],
    execute(bot, message, args) {
        const calculation = math.evaluate(args.join(" "));

        const embed = new MessageEmbed()
            .setTitle("8Ball")
            .addField("Input", `\`\`\`js\n${args.join(" ")}\`\`\``)
            .addField("Output:", `\`\`\`js\n${calculation}\`\`\``)
            .setColor("BLUE")
            .setFooter(message.author.username)
            .setTimestamp();

        message.channel.send(embed);
    }
};