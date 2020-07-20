const Discord = require("discord.js");
const bot = new Discord.Client({ disableMentions: "everyone" });

const { token, prefix } = require("../config.json");

// Commands
bot.commands = new Discord.Collection();
require("./utils/command")(bot);

bot.once("ready", () => {
    console.log("Ready!");
});

bot.on("message", message => {
    if (!message.content.startsWith(prefix) || message.author.bot) return;

    const args = message.content.slice(prefix.length).split(/ +/);
    const command = args.shift().toLowerCase();


    try {
        bot.commands.get(command).execute(bot, message, args);
    }
    catch (e) {
        if (e.message === "Cannot read property 'execute' of undefined") {
            return console.log("Command not found")
        }
        console.log(e);
    }
});

bot.login(token);