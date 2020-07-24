module.exports = {
    name: "say",
    description: "Let the bot say something",
    category: "admin",
    execute(bot, message, args) {
        message.delete();
        if (!message.member.hasPermission("ADMINISTRATOR"))
            return message.reply("Sorry, You don't have the correct permissions for this command.");
        const msg = args.join(" ");

        message.channel.send(msg);
    }
};