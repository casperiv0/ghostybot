const cowsPack = require("cows");

module.exports = {
    name: "cow",
    description: "Returns a cow ascii",
    category: "animal",
    async execute(bot, message) {
        const cows = cowsPack();

        const cow = cows[Math.floor(Math.random() * cows.length)];

        message.channel.send(`\`\`\` ${cow}  \`\`\``);
    }
};