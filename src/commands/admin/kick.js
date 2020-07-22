module.exports = {
    name: "kick",
    description: "Kick a user",
    async execute(bot, message, args) {
        const kickUser = message.guild.member(
            message.mentions.users.first() ||
            message.guild.members.cache.get(args[0])
        );
        const kickReason = args.join(" ").slice(22);

        if (!message.member.hasPermission("KICK_MEMBERS" || "ADMINISTRATOR"))
            return message.channel.send("You don't have permissions for that!");

        if (kickUser.hasPermission("KICK_MEMBERS" || "ADMINISTRATOR"))
            return message.channel.send("That person can't be kicked!");

        kickUser.kick(kickReason);

        message.channel.send(`${kickUser} was successfully kicked from the server.`);

    }
};