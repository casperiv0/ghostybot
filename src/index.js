require("./utils/checkValid")();
const { Collection, Client } = require("discord.js");
const bot = new Client({ disableMentions: "everyone" });

const { token, prefix } = require("../config.json");

const queue = new Map();
const stickyData = {
    channelId: "",
    id: "",
    msg: ""
};

// Commands
bot.commands = new Collection();
bot.aliases = new Collection();
require("./utils/command")(bot);

bot.once("ready", () => {
    console.log(`Bot is running with ${bot.channels.cache.size} channels and ${bot.users.cache.size} users`);
});


bot.on("message", async message => {
    // Check if sticky
    const isSticky = message.channel.id === stickyData?.channelId;

    if (isSticky) {
        if (message.author.bot && message.content === stickyData.msg) return;

        const fMessage = message.channel.messages.cache.get(stickyData.id);
        if (fMessage) {
            fMessage.delete();
        }

        const stickyMessage = await message.channel.send(stickyData.msg);
        stickyData.id = stickyMessage.id;
    }

    if (!message.content.startsWith(prefix) || message.author.bot) return;

    const args = message.content.slice(prefix.length).split(/ +/);
    const command = args.shift().toLowerCase();

    // music queue
    const serverQueue = queue.get(message.guild.id);

    try {
        const cmd = bot.commands.get(command) ||
            bot.commands.get(bot.aliases.get(command));

        cmd.execute(bot, message, args, serverQueue, queue, stickyData);
    }
    catch (e) {
        if (e.message === "Cannot read property 'execute' of undefined") {
            return console.log("Command not found");
        }
        console.log(e);
    }
});


bot.login(token);