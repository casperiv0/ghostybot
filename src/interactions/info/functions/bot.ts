import * as DJS from "discord.js";
import dayJs from "dayjs";
import duration from "dayjs/plugin/duration";
import Bot from "structures/Bot";
import { hyperlink, inlineCode } from "@discordjs/builders";
dayJs.extend(duration);

export async function botInfo(
  bot: Bot,
  interaction: DJS.CommandInteraction,
  lang: typeof import("@locales/english").default,
) {
  const uptime = dayJs.duration(bot?.uptime ?? 0).format(" D [days], H [hrs], m [mins], s [secs]");

  const userCount = bot.utils.formatNumber(bot.guilds.cache.reduce((a, g) => a + g.memberCount, 0));

  const latency = Math.round(bot.ws.ping).toString();
  const ramUsage = (process.memoryUsage().heapUsed / 1024 / 1024).toFixed(2);

  const botRepo = hyperlink(lang.BOT.CLICK_HERE, "https://github.com/dev-caspertheghost/ghostybot");
  const supportServer = hyperlink(lang.BOT.CLICK_HERE, "https://discord.gg/XxHrtkA");
  const dashboard = hyperlink(lang.BOT.CLICK_HERE, process.env["NEXT_PUBLIC_DASHBOARD_URL"]!);

  const commandCount = bot.utils.commandCount;

  const botDeveloper = hyperlink(lang.BOT.DEVELOPER, "https://caspertheghost.me");
  const contributors = hyperlink(
    lang.BOT.CONTRIBUTORS,
    "https://github.com/Dev-CasperTheGhost/ghostybot/contributors",
  );
  const botInvite = hyperlink(
    lang.BOT.INVITE_BOT,
    `https://discord.com/oauth2/authorize?client_id=${bot.user?.id}&scope=applications.commands+bot&permissions=8`,
  );

  const embed = bot.utils
    .baseEmbed(interaction)
    .setTitle(lang.BOT.INFO_2)
    .setDescription(
      `
**${lang.BOT.LATENCY}:** ${latency}
**${lang.BOT.UPTIME}:** ${uptime}
`,
    )
    .addField(
      lang.BOT.INFO,
      `
**${lang.BOT.USERS}:** ${inlineCode(userCount)}
**${lang.BOT.GUILDS}:** ${inlineCode(bot.utils.formatNumber(bot.guilds.cache.size))}
**${lang.BOT.CHANNELS}:** ${inlineCode(bot.utils.formatNumber(bot.channels.cache.size))}
**${lang.BOT.COMMAND_COUNT}:** ${inlineCode(bot.utils.formatNumber(commandCount))}
              `,
      true,
    )
    .addField(
      lang.BOT.SYSTEM_INFO,
      `
**${lang.BOT.RAM_USAGE}:**  ${ramUsage}MB
**${lang.BOT.DJS_V}:** v13`,
      true,
    )
    .addField(
      "Links",
      `
${botDeveloper}
${contributors}
${botInvite}`,
      true,
    )
    .addField(lang.BOT.REPO, botRepo, true)
    .addField(lang.UTIL.SUPPORT_SERVER, supportServer, true)
    .addField(lang.BOT.DASHBOARD, dashboard, true)
    .setImage(
      "https://raw.githubusercontent.com/Dev-CasperTheGhost/ghostybot/main/.github/Ghostybot-banner.png",
    );

  interaction.reply({ embeds: [embed] });
}
