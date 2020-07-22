const figlet = require("figlet");

module.exports = {
    name: "ascii",
    description: "Transform text to ascii",
    async execute(bot, message, args) {
        const text = args.join(" ");

        figlet.text(text, (e, txt) => {
            if (e) return console.log(e);
            message.channel.send(`\`\`\`\ ${txt.trimRight()} \`\`\``);
        })
    }
}