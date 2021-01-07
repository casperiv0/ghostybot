const morseCode = require("../../data/morse");

module.exports = {
    name: "morse",
    description: "Convert a string to morse code",
    category: "util",
    requiredArgs: ["text"],
    execute(bot, message, args) {
        const lang = await bot.getGuildLang(message.guild.id);
        const morse = args
            .join(" ")
            .toLowerCase()
            .replace(/./g, x => `${morseCode[x]}\u2001`)
            .trim();
        if (!args.replace(/./g, x => `${morseCode[x]}\u2001`)) return message.channel.send(lang.UTILS.TEXT_NOT_SUP);

        message.channel.send(morse);
    },
};
