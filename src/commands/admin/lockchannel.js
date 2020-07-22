module.exports = {
    name: "lockchannel",
    description: "Lock A channel",
    execute(bot, message, args) {
        const user = message.member;
        const lockReason = args.join(" ");

        if (!lockReason) return message.reply("Please provide a reason to lock this channel");

        if (!user.hasPermission(["MANAGE_CHANNELS"])) return message.channel.send("You don't have to correct permissions!");

        message.channel.updateOverwrite(message.guild.id, {
            SEND_MESSAGES: false
        });
        message.channel.send(`Channel was successfully locked, Reason: **${lockReason}**`);
    }
};