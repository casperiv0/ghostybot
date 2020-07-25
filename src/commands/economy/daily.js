const db = require("quick.db");

module.exports = {
    name: "daily",
    description: "daily",
    category: "economy",
    async execute(bot, message) {
        const user = message.author;
        const timeout = 86400000;
        const amount = 500;

        const daily = await db.fetch(`daily_${message.guild.id}_${user.id}`);

        if (daily !== null && timeout - (Date.now() - daily) > 0) {
            message.channel.send("You have already collected your daily!");
        } else {
            message.channel.send(`You collected your daily of ${amount} coins`);
            db.add(`money_${message.guild.id}_${user.id}`, amount);
            db.set(`daily_${message.guild.id}_${user.id}`, Date.now());
        }

    }
};