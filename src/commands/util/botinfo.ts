import { Message, version } from "discord.js";
import moment from "moment";
import Command from "../../structures/Command";
import Bot from "../../structures/Bot";
import BotModel from "../../models/Bot.model";

export default class BotInfoCommand extends Command {
  constructor(bot: Bot) {
    super(bot, {
      name: "botinfo",
      description: "Shows info about the bot",
      category: "util",
      aliases: ["bot", "ping"],
    });
  }

  async execute(bot: Bot, message: Message) {
    const lang = await bot.utils.getGuildLang(message.guild?.id);

    try {
      const uptime = (moment.duration(bot.uptime) as any).format(
        " D [days], H [hrs], m [mins], s [secs]"
      );
      const nodev = process.version;
      const { total_used_cmds, used_since_up } = await BotModel.findOne({ bot_id: bot.user?.id });
  
      const embed = bot.utils
        .baseEmbed(message)
        .setTitle(`${lang.BOT.INFO_2}`)
        .addField(`${lang.MEMBER.USERNAME}:`, bot.user?.username)
        .addField(`${lang.BOT.LATENCY}:`, Math.round(bot.ws.ping), true)
        .addField(
          `${lang.HELP.COMMANDS}:`,
          `
  **${lang.BOT.USED_SINCE_UP}:** ${used_since_up}
  **${lang.BOT.TOTAL_USED_CMDS}:** ${total_used_cmds}`
        )
        .addField(
          `__**${lang.BOT.INFO}:**__`,
          `
  **${lang.BOT.USERS}:** ${bot.utils.formatNumber(80000)}
  **${lang.BOT.GUILDS}:** ${bot.utils.formatNumber(bot.guilds.cache.size)}
  **${lang.BOT.CHANNELS}:** ${bot.utils.formatNumber(bot.channels.cache.size)}
  **${lang.BOT.COMMAND_COUNT}:** ${bot.commands.size}
  **${lang.BOT.VC_CONNS}:** ${bot.voice.connections.size}
              `,
          true
        )
        .addField(
          `__**${lang.BOT.SYSTEM_INFO}**__`,
          `**${lang.BOT.RAM_USAGE}:**  ${(process.memoryUsage().heapUsed / 1024 / 1024).toFixed(2)}MB
  **${lang.BOT.UPTIME}:** ${uptime}
  **${lang.BOT.NODE_V}:** ${nodev}
  **${lang.BOT.DJS_V}:** ${version}`,
          true
        )
        .addField(
          "Links",
          `
  [${lang.BOT.DEVELOPER}](https://caspertheghost.me)
  [${lang.BOT.CONTRIBUTORS}](https://github.com/Dev-CasperTheGhost/ghostybot/contributors)
  [${lang.BOT.INVITE_BOT}](https://discord.com/oauth2/authorize?client_id=${bot.user?.id}&scope=bot&permissions=8)`,
          true
        )
        .addField(
          `${lang.BOT.REPO}`,
          "[Click Here](https://github.com/dev-caspertheghost/ghostybot)",
          true
        )
        .addField(`${lang.UTIL.SUPPORT_SERVER}`, "[Click Here](https://discord.gg/XxHrtkA)", true)
        .addField(`${lang.BOT.DASHBOARD}`, `[Click Here](${bot.config.dashboard.dashboardUrl})`, true)
        .setImage(
          "https://raw.githubusercontent.com/Dev-CasperTheGhost/ghostybot/main/.github/Ghostybot-banner.png"
        );
  
      message.channel.send(embed);
    } catch (err) {
      bot.utils.sendErrorLog(err, "error");
      return message.channel.send(lang.GLOBAL.ERROR);
    }
  }
}
