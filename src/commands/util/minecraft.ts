import { Message } from "discord.js";
import fetch from "node-fetch";
import Command from "structures/Command";
import Bot from "structures/Bot";

export default class MinecraftCommand extends Command {
  constructor(bot: Bot) {
    super(bot, {
      name: "minecraft",
      description: "Get info about a minecraft server",
      category: "util",
      aliases: ["mc"],
      requiredArgs: [{ name: "server-ip" }],
      typing: true,
    });
  }

  async execute(message: Message, args: string[]) {
    const lang = await this.bot.utils.getGuildLang(message.guild?.id);
    try {
      const [server] = args;

      const url = `http://api.xaliks.xyz/info/minecraft?type=server&query=${encodeURIComponent(
        server,
      )}`;
      const data = await fetch(url).then((res) => res.json());

      if (data.error) {
        return message.channel.send({ content: lang.UTIL.MC_NOT_FOUND });
      }

      const status = data.status === "online" ? lang.MEMBER.ONLINE : lang.MEMBER.OFFLINE;
      const players = data.players?.now.toString() ?? "Unknown";
      const maxPlayers = data.players?.max.toString() ?? "Unknown";
      const description = data.motd || lang.GLOBAL.NONE;
      const version = data.version;
      const port = data.port.toString();

      const embed = this.bot.utils
        .baseEmbed(message)
        .setTitle(`${server}`)
        .addField(lang.MEMBER.STATUS, status, true)
        .addField(lang.UTIL.PLAYERS, players, true)
        .addField(lang.UTIL.MAX_PLAYERS, maxPlayers, true)
        .addField(lang.UTIL.VERSION, version, true)
        .addField(lang.UTIL.PORT, port, true)
        .addField(lang.UTIL.DESCRIPTION, description);

      message.channel.send({ embeds: [embed] });
    } catch (err) {
      this.bot.utils.sendErrorLog(err, "error");
      return message.channel.send({ content: lang.GLOBAL.ERROR });
    }
  }
}
