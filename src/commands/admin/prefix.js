const { setServerPrefix, getServerPrefix } = require("../../utils/functions");

module.exports = {
    name: "prefix",
    description: "Set a prefix for your server",
    category: "admin",
    async execute(bot, message, args) {
        if (!message.member.hasPermission("ADMINISTRATOR"))
            return message.reply("Sorry, You don't have the correct permissions for this command.");

        const prefix = args[0];
        const currentPrefix = await getServerPrefix(message.guild.id);

        if (!prefix)
            return message.channel.send(`Current server prefix: \`${currentPrefix}\` \n Use \`${currentPrefix}prefix <prefix>\` to set a new prefix`);


        setServerPrefix(message.guild.id, prefix);
        message.channel.send(`Successfully updated prefix to ${prefix}`);
    }
};