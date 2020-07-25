const { MessageEmbed } = require("discord.js");
const db = require("quick.db");

module.exports = {
    name: "balance",
    description: "balance",
    category: "economy",
    async execute(bot, message) {
        const user = message.mentions.members.first() || message.author;
        let money = await db.fetch(`money_${message.guild.id}_${user.id}`);
        let bank = await db.fetch(`bank_${message.guild.id}_${user.id}`);

        if (money === null) money = 0;
        if (bank === null) bank = 0;

        const embed = new MessageEmbed()
            .setTitle(`${user.username}'s Balance`)
            .setColor("BLUE")
            .addField("Pocket:", money)
            .addField("Bank", bank);

        message.channel.send(embed);
    }
};