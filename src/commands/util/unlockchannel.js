module.exports = {
    name: "unlockchannel",
    description: "Unlock A channel",
    execute(bot, message, args) {
        const user = message.member;

        if (!user.hasPermission(["MANAGE_CHANNELS"])) return message.channel.send("You don't have to correct permissions!")

        message.channel.updateOverwrite(message.guild.id, {
            SEND_MESSAGES: true
        })
        message.channel.send(`Channel was successfully unlocked`)
    }
}