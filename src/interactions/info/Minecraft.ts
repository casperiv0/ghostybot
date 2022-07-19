import * as DJS from "discord.js";
import { request } from "undici";
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
          type: DJS.ApplicationCommandOptionType.String,
          required: true,
        },
      ],
    });
  }

  async execute(
    interaction: DJS.ChatInputCommandInteraction<"cached" | "raw">,
    lang: typeof import("@locales/english").default,
  ) {
    await interaction.deferReply();

    const query = interaction.options.getString("query", true);

    const url = `http://api.xaliks.xyz/info/minecraft?type=server&query=${encodeURIComponent(
      query,
    )}`;

    const data = await request(url).then((res) => res.body.json());

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
      .addFields(
        { name: lang.MEMBER.STATUS, value: status, inline: true },
        { name: lang.UTIL.PLAYERS, value: players, inline: true },
        { name: lang.UTIL.MAX_PLAYERS, value: maxPlayers, inline: true },
        { name: lang.UTIL.VERSION, value: version, inline: true },
        { name: lang.UTIL.PORT, value: port, inline: true },
        { name: lang.UTIL.DESCRIPTION, value: description },
      );

    await interaction.editReply({ embeds: [embed] });
  }
}
