import { Message } from "discord.js";
import fetch from "node-fetch";
import Command from "../../structures/Command";
import Bot from "../../structures/Bot";

export default class MinecraftCommand extends Command {
  constructor(bot: Bot) {
    super(bot, {
      name: "minecraft",
      description: "Get info about a minecraft server",
      category: "util",
      aliases: ["mc"],
      requiredArgs: [{ name: "server-ip" }],
    });
  }

  async execute(bot: Bot, message: Message, args: string[]) {
    const lang = await bot.utils.getGuildLang(message.guild?.id);
    try {
      const [server] = args;

      const url = `https://mcapi.us/server/status?ip=${server}`;
      const data = await fetch(url).then((res) => res.json());

      if (!data.server.name) {
        return message.channel.send(lang.UTIL.MC_NOT_FOUND);
      }

      const status = data.online ? lang.MEMBER.ONLINE : lang.MEMBER.OFFLINE;
      const players = data.players.now;
      const maxPlayers = data.players.max;
      const description = data.motd;
      const version = data.server.name;
      const protocol = data.server.protocol;

      const embed = bot.utils
        .baseEmbed(message)
        .setTitle(`${server}`)
        .addField(lang.MEMBER.STATUS, status, true)
        .addField(lang.UTIL.PLAYERS, players, true)
        .addField(lang.UTIL.MAX_PLAYERS, maxPlayers, true)
        .addField(lang.UTIL.VERSION, version, true)
        .addField(lang.UTIL.PROTOCOL, protocol, true)
        .addField(lang.UTIL.DESCRIPTION, description ? description : lang.GLOBAL.NONE);

      message.channel.send(embed);
    } catch (err) {
      bot.utils.sendErrorLog(err, "error");
      return message.channel.send(lang.GLOBAL.ERROR);
    }
  }
}
