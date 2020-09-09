const { setServerPrefix } = require("../utils/functions");
module.exports = {
    name: "guildCreate",
    async execute(bot, guild) {
        setServerPrefix(guild.id, "!");
    }
}
