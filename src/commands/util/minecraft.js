const { MessageEmbed } = require("discord.js");
const fetch = require("node-fetch");

module.exports = {
    name: "minecraft",
    description: "Get info about a minecraft server",
    async execute(bot, message, args) {
        const server = args[0];

        if (!server) return message.reply("Please provide a server IP");

        const url = `https://mcapi.us/server/status?ip=${server}`;
        const data = await fetch(url).then(res => res.json());

        if (!data.server.name) return message.channel.send("Server wasn't found");

        const status = data.online ? "Online" : "Offline";
        const players = data.players.now;
        const maxPlayers = data.players.max;
        const description = data.motd;
        const version = data.server.name;
        const protocol = data.server.protocol;

        const embed = new MessageEmbed()
            .setTitle(server)
            .setDescription(`
                **Status:** ${status}
                **Players:** ${players}
                **Max Players:** ${maxPlayers}
                **Description:** ${description}
                **Version:** ${version}
                **Protocol:** ${protocol}
            `)
            .setColor("BLUE")
            .setTimestamp()
            .setFooter(message.author.username);

        message.channel.send(embed);
    }
};