const morseCode = require("../../data/morse");

module.exports = {
    name: "morse",
    description: "Convert a string to morse code",
    category: "util",
    requiredArgs: ["text"],
    execute(bot, message, args) {
        const morse = args
            .join(" ")
            .toLowerCase()
            .replace(/./g, x => `${morseCode[x]}\u2001`)
            .trim();

        message.channel.send(morse);
    },
};