import * as DJS from "discord.js";
import fetch from "node-fetch";
import { Bot } from "structures/Bot";
import { SubCommand } from "structures/Command/SubCommand";

export default class MinecraftInfoCommand extends SubCommand {
  constructor(bot: Bot) {
    super(bot, {
      commandName: "info",
      name: "minecraft",
      description: "Get info about a minecraft server",
      options: [
        {
          name: "query",
          description: "The server IP",
          type: "STRING",
          required: true,
        },
      ],
    });
  }

  async execute(
    interaction: DJS.CommandInteraction,
    lang: typeof import("@locales/english").default,
  ) {
    await interaction.deferReply();

    const query = interaction.options.getString("query", true);

    const url = `http://api.xaliks.xyz/info/minecraft?type=server&query=${encodeURIComponent(
      query,
    )}`;

    const data = (await fetch(url).then((res) => res.json())) as any;

    if (data.error) {
      return interaction.editReply({ content: lang.UTIL.MC_NOT_FOUND });
    }

    const status = data.status === "online" ? lang.MEMBER.ONLINE : lang.MEMBER.OFFLINE;
    const players = data.players?.now.toString() ?? lang.UTIL.UNKNOWN;
    const maxPlayers = data.players?.max.toString() ?? lang.UTIL.UNKNOWN;
    const description = data.motd || lang.GLOBAL.NONE;
    const version = data.version;
    const port = data.port.toString();

    const embed = this.bot.utils
      .baseEmbed(interaction)
      .setTitle(query)
      .addField(lang.MEMBER.STATUS, status, true)
      .addField(lang.UTIL.PLAYERS, players, true)
      .addField(lang.UTIL.MAX_PLAYERS, maxPlayers, true)
      .addField(lang.UTIL.VERSION, version, true)
      .addField(lang.UTIL.PORT, port, true)
      .addField(lang.UTIL.DESCRIPTION, description);

    await interaction.editReply({ embeds: [embed] });
  }
}
