const { setUserXp } = require('../../utils/functions')

module.exports = {
    name: "resetxp", // name can't have a space, use args instead
    description: "reset all users xp for current server",
    category: "levels",
    usage: "resetxp all",
    async execute(bot, message, args) {
        const users = await message.guild.members.fetch();

        users.forEach(user => {
            
            setUserXp(message.guild.id, user.id, 0)
        })

        
        message.channel.send("Succesfully reseted everyone's xp")
    }
}
