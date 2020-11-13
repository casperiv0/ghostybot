const fetch = require("node-fetch");
const BaseEmbed = require("../../modules/BaseEmbed");

module.exports = {
  name: "minecraft",
  description: "Get info about a minecraft server",
  category: "util",
  aliases: ["mc"],
  async execute(bot, message, args) {
    const lang = await bot.getGuildLang(message.guild.id);
    const server = args[0];

    if (!server) {
      return message.channel.send(lang.UTIL.MC_PROVIDE_IP);
    }

    const url = `https://mcapi.us/server/status?ip=${server}`;
    const data = await fetch(url).then((res) => res.json());

    if (!data.server.name) {
      return message.channel.send(lang.UTIL.MC_NOT_FOUND);
    }

    const status = data.online
      ? lang.MEMBER.ONLINE
      : lang.MEMBER.OFFLINE;
    const players = data.players.now;
    const maxPlayers = data.players.max;
    const description = data.motd;
    const version = data.server.name;
    const protocol = data.server.protocol;

    const embed = BaseEmbed(message)
      .setTitle(`${server}`)
      .addField(lang.MEMBER.STATUS, status, true)
      .addField(lang.UTIL.PLAYERS, players, true)
      .addField(lang.UTIL.MAX_PLAYERS, maxPlayers, true)
      .addField(lang.UTIL.VERSION, version, true)
      .addField(lang.UTIL.PROTOCOL, protocol, true)
      .addField(
        lang.UTIL.DESCRIPTION,
        description ? description : lang.GLOBAL.NONE
      );

    message.channel.send(embed);
  },
};
