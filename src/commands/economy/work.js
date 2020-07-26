require("moment-duration-format");
const { addUserMoney, getUserWork, setUserWork } = require("../../utils/functions");
const jobs = require("../../data/jobs.json");
const { MessageEmbed } = require("discord.js");
const moment = require("moment");

module.exports = {
    name: "work",
    description: "work",
    category: "economy",
    async execute(bot, message) {
        const user = message.author;
        const timeout = 3600000;


        const work = await getUserWork(message.guild.id, user.id);

        if (work !== null && timeout - (Date.now() - work) > 0) {
            const timeUntillWork = moment(timeout - (Date.now() - work)).format("H [hrs], m [mins], s [secs]");
            message.channel.send(`You have already worked recently, ${timeUntillWork} remaining`);
        } else {
            const { name, amount } = jobs[Math.floor(Math.random() * jobs.length)];

            const embed = new MessageEmbed()
                .setTitle("Work!")
                .setDescription(`${user.username} worked as a **${name}** and earned **${amount}**! 💰`)
                .setColor("BLUE");

            message.channel.send(embed);

            addUserMoney(message.guild.id, user.id, amount);
            setUserWork(message.guild.id, user.id, Date.now());
        }

    }
};