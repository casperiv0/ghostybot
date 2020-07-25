const db = require("quick.db");
const jobs = require("../../data/jobs.json");
const { MessageEmbed } = require("discord.js");

module.exports = {
    name: "work",
    description: "work",
    category: "economy",
    async execute(bot, message) {
        const user = message.author;
        const timeout = 600000;

        const work = await db.fetch(`work_${message.guild.id}_${user.id}`);

        if (work !== null && timeout - (Date.now() - work) > 0) {
            message.channel.send("You have already worked recently!");
        } else {
            const { name, amount } = jobs[Math.floor(Math.random() * jobs.length)];

            const embed = new MessageEmbed()
                .setTitle("Work!")
                .setDescription(`${user.username} worked as a **${name}** and earned **${amount}**! 💰`)
                .setColor("BLUE");

            message.channel.send(embed);

            db.add(`money_${message.guild.id}_${user.id}`, amount);
            db.set(`work_${message.guild.id}_${user.id}`, Date.now());
        }

    }
};