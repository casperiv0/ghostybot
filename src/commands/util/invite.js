module.exports = {
    name: "invite",
    description: "Get a random color",
    category: "util",
    execute(bot, message) {
        if (message.member.hasPermission("CREATE_INSTANT_INVITE")) {
            message.channel
                .createInvite()
                .then(invite =>
                    message.channel.send(
                        `I've successfully created the invite!\nCode: https://discordapp.com/invite/${invite.code}`
                    )
                );
        } else message.reply("You don't have the Create Invite permission!");
    }
};