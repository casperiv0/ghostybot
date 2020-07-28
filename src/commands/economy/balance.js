const { MessageEmbed } = require("discord.js");
const { getUserMoney, getUserBank } = require("../../utils/functions");

module.exports = {
    name: "balance",
    description: "balance",
    category: "economy",
    async execute(bot, message) {
        const user = message.mentions.users.first() || message.author;
        let money = await getUserMoney(message.guild.id, user.id);
        let bank = await getUserBank(message.guild.id, user.id);
        
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