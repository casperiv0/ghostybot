module.exports = {
    name: "ban",
    description: "ban",
    async execute(bot, message, args) {
        const banUser = message.guild.member(
            message.mentions.users.first() ||
            message.guild.members.cache.get(args[0])
        );
        const banReason = args.join(" ").slice(23);

        if (!message.member.hasPermission("BAN_MEMBERS" || "ADMINISTRATOR"))
            return message.channel.send("You don't have permissions for that!");

        if (banUser.hasPermission("BAN_MEMBERS"))
            return message.channel.send("That person can't be banned!");

        banUser.ban(banReason)

        message.channel.send(`${banUser} was successfully banned from the server.`)
    }
}