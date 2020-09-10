const { setUserXp } = require('../../utils/functions')

module.exports = {
    name: "resetxp", // name can't have a space, use args instead
    description: "reset all users xp for current server",
    category: "levels",
    usage: "resetxp all",
    async execute(bot, message, args) {
        if(!message.member.hasPermission("MANAGE_GUILD"))
        return message.channel.send("You need Manage Guild permission")
        const users = await message.guild.members.fetch();

        users.forEach(user => {
            
            setUserXp(message.guild.id, user.id, 0)
        })

        // send message
        message.channel.send("Succesfully reseted everyone's xp")
    }
}
