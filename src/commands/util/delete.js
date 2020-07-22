module.exports = {
    name: "delete",
    description: "Delete message, up to 100",
    execute(bot, message, args) {
        // check for perms
        const user = message.member;
        if (!user.hasPermission("MANAGE_MESSAGES"))
            return message.channel.send("You don't have the correct permissions for that!");

        if (!args[0]) return message.channel.send("Please provide a number");


        message.channel.bulkDelete(args[0]).then(() => {
            message.channel
                .send(`Deleted ${args[0]} messages.`)
                .then(msg => msg.delete({ timeout: 2000 }, true));
        });
    }
};