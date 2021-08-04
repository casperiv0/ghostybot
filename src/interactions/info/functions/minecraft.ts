import * as DJS from "discord.js";
import Bot from "structures/Bot";

export async function minecraft(
  bot: Bot,
  interaction: DJS.CommandInteraction,
  lang: typeof import("@locales/english").default,
) {
  const query = interaction.options.getString("query", true);

  const url = `http://api.xaliks.xyz/info/minecraft?type=server&query=${encodeURIComponent(query)}`;

  const data = await fetch(url).then((res) => res.json());

  if (data.error) {
    return interaction.reply({ ephemeral: true, content: lang.UTIL.MC_NOT_FOUND });
  }

  await interaction.defer();

  const status = data.status === "online" ? lang.MEMBER.ONLINE : lang.MEMBER.OFFLINE;
  const players = data.players?.now.toString() ?? lang.UTIL.UNKNOWN;
  const maxPlayers = data.players?.max.toString() ?? lang.UTIL.UNKNOWN;
  const description = data.motd || lang.GLOBAL.NONE;
  const version = data.version;
  const port = data.port.toString();

  const embed = bot.utils
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
