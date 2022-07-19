import process from "node:process";
import * as DJS from "discord.js";
import { hyperlink, inlineCode } from "@discordjs/builders";
import dayjs from "dayjs";
import duration from "dayjs/plugin/duration";
import { Bot } from "structures/Bot";
import { SubCommand } from "structures/Command/SubCommand";
dayjs.extend(duration);

export default class BotInfoCommand extends SubCommand {
  constructor(bot: Bot) {
    super(bot, {
      commandName: "info",
      name: "bot",
      description: "Get information about GhostyBot",
    });
  }

  async execute(
    interaction: DJS.ChatInputCommandInteraction<"cached" | "raw">,
    lang: typeof import("@locales/english").default,
  ) {
    await interaction.deferReply();

    const uptime = dayjs
      .duration(this.bot.uptime ?? 0)
      .format(" D [days], H [hrs], m [mins], s [secs]");

    const userCount = this.bot.utils.formatNumber(
      this.bot.guilds.cache.reduce((a, g) => a + g.memberCount, 0),
    );

    const latency = Math.round(this.bot.ws.ping).toString();
    const ramUsage = (process.memoryUsage().heapUsed / 1024 / 1024).toFixed(2);

    const botRepo = hyperlink(
      lang.BOT.CLICK_HERE,
      "https://github.com/dev-caspertheghost/ghostybot",
    );
    const supportServer = hyperlink(lang.BOT.CLICK_HERE, "https://discord.gg/XxHrtkA");
    const dashboard = hyperlink(lang.BOT.CLICK_HERE, process.env["NEXT_PUBLIC_DASHBOARD_URL"]!);

    const commandCount = this.bot.utils.commandCount;

    const botDeveloper = hyperlink(lang.BOT.DEVELOPER, "https://caspertheghost.me");
    const contributors = hyperlink(
      lang.BOT.CONTRIBUTORS,
      "https://github.com/Dev-CasperTheGhost/ghostybot/contributors",
    );
    const botInvite = hyperlink(
      lang.BOT.INVITE_BOT,
      `https://discord.com/oauth2/authorize?client_id=${this.bot.user?.id}&scope=applications.commands+bot&permissions=8`,
    );

    const embed = this.bot.utils
      .baseEmbed(interaction)
      .setTitle(lang.BOT.INFO_2)
      .setDescription(
        `
      **${lang.BOT.LATENCY}:** ${latency}
      **${lang.BOT.UPTIME}:** ${uptime}
      `,
      )
      .addFields(
        {
          name: lang.BOT.INFO,
          value: `
**${lang.BOT.USERS}:** ${inlineCode(userCount)}
**${lang.BOT.GUILDS}:** ${inlineCode(this.bot.utils.formatNumber(this.bot.guilds.cache.size))}
**${lang.BOT.CHANNELS}:** ${inlineCode(this.bot.utils.formatNumber(this.bot.channels.cache.size))}
**${lang.BOT.COMMAND_COUNT}:** ${inlineCode(this.bot.utils.formatNumber(commandCount))}
`,
          inline: true,
        },
        {
          name: lang.BOT.SYSTEM_INFO,
          value: `
**${lang.BOT.RAM_USAGE}:**  ${ramUsage}MB
**${lang.BOT.DJS_V}:** v13`,
          inline: true,
        },
        {
          name: "Links",
          value: `
${botDeveloper}
${contributors}
${botInvite}`,
          inline: true,
        },
        { name: lang.BOT.REPO, value: botRepo, inline: true },
        { name: lang.UTIL.SUPPORT_SERVER, value: supportServer, inline: true },
        { name: lang.BOT.DASHBOARD, value: dashboard, inline: true },
      )
      .setImage(
        "https://raw.githubusercontent.com/Dev-CasperTheGhost/ghostybot/main/.github/Ghostybot-banner.png",
      );

    await interaction.editReply({ embeds: [embed] });
  }
}
