const { MessageEmbed } = require("discord.js");
const fetch = require("node-fetch");

module.exports = {
  name: "minecraft",
  description: "Get info about a minecraft server",
  category: "util",
  async execute(bot, message, args) {
    const server = args[0];

    if (!server) return message.reply("Please provide a server IP");

    const url = `https://mcapi.us/server/status?ip=${server}`;
    const data = await fetch(url).then((res) => res.json());

    if (!data.server.name) return message.channel.send("Server wasn't found");

    const status = data.online ? "Online" : "Offline";
    const players = data.players.now;
    const maxPlayers = data.players.max;
    const description = data.motd;
    const version = data.server.name;
    const protocol = data.server.protocol;
    
    const embed = new MessageEmbed()
      .setTitle(server)
      .addField("**Status**", status, true)
      .addField("**Players**", players, true)
      .addField("**Max Players**", maxPlayers, true)
      .addField("**Version**", version, true)
      .addField("**Protocol**", protocol, true)
      .addField("**Description**", description)
      .setColor("BLUE")
      .setTimestamp()
      .setFooter(message.author.username);

    message.channel.send(embed);
  },
};
