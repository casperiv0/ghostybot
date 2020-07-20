const { MessageEmbed } = require("discord.js");
const { ownerId } = require("../../../config.json");
const util = require("util");

module.exports = {
    name: "eval",
    description: "Eval",
    async execute(bot, message, args) {
        if (message.author.id !== ownerId) return message.reply("Only the owner is allowed to run this command");

        const toEval = args.join(" ");
        const evaluated = util.inspect(eval(toEval, { depth: 0 }));

        const embed = new MessageEmbed()
            .setTitle("Eval Command")
            .addField("**Input:**", `\`\`\`${toEval}\`\`\``)
            .addField("**Output:**", ` \`\`\`${evaluated}\`\`\``)
            .setColor("BLUE")
            .setTimestamp()
            .setFooter(message.author.username)

        message.channel.send(embed)
    }
}