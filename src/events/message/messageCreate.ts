import { hyperlink } from "@discordjs/builders";
import * as DJS from "discord.js";
import { Bot } from "structures/Bot";
import { Event } from "structures/Event";

export default class MessageEvent extends Event {
  constructor(bot: Bot) {
    super(bot, DJS.Constants.Events.MESSAGE_CREATE);
  }

  async execute(bot: Bot, message: DJS.Message) {
    try {
      if (!message?.guild?.available) return;
      if (message.channel.type === DJS.ChannelType.DM) return;
      if (!bot.utils.hasSendPermissions(message)) return;

      if (!bot.user) return;
      if (!message.guild?.me) return;

      const guildId = message?.guild?.id;
      const userId = message?.author?.id;

      const guild = await bot.utils.getGuildById(guildId);
      // an error occurred
      if (!guild) return;

      const lang = await bot.utils.getGuildLang(guildId);
      const user = await bot.utils.getUserById(userId, guildId);
      const mentions = message.mentions.members;

      if (guild?.ignored_channels?.includes(message.channel.id)) return;

      // sticky
      const sticky = await bot.utils.getSticky(message.channel.id);
      const isSticky = message.channel.id === sticky?.channel_id;

      if (isSticky) {
        if (!sticky) return;
        if (message.author.bot || message.content === sticky?.message) return;
        if (
          !message.channel
            ?.permissionsFor(message.guild.me)
            ?.has(DJS.Permissions.FLAGS.VIEW_CHANNEL)
        ) {
          return;
        }

        const msg = await message.channel.messages.fetch(sticky.message_id);
        if (msg) {
          msg.deletable && msg?.delete();
        }

        const stickyMessage = await message.channel.send({
          content: sticky.message,
        });
        sticky.message_id = stickyMessage.id;
        await sticky.save();
      }

      // check if mention user is afk
      if (mentions && mentions?.size > 0) {
        mentions.forEach(async (member) => {
          const user = await bot.utils.getUserById(member.user.id, guildId);

          if (user?.afk?.is_afk) {
            const embed = bot.utils
              .baseEmbed(message)
              .setTitle("AFK!")
              .setDescription(
                this.bot.utils.translate(lang.MESSAGE.USER_IS_AFK, {
                  tag: member.user.tag,
                  reason: user.afk.reason ?? lang.GLOBAL.NOT_SPECIFIED,
                }),
              );

            message.channel.send({ embeds: [embed] });
          }
        });
      }

      // remove AFK from user if they send a message
      if (!message.author.bot && user?.afk.is_afk === true) {
        await bot.utils.updateUserById(userId, guildId, {
          afk: {
            is_afk: false,
            reason: null,
          },
        });

        const embed = bot.utils.baseEmbed(message).setDescription(
          this.bot.utils.translate(lang.MESSAGE.NOT_AFK_ANYMORE, {
            tag: message.author.tag,
          }),
        );

        const msg = await message.channel.send({ embeds: [embed] });

        setTimeout(() => {
          msg.deletable && msg.delete();
        }, 5000);
      }

      // level
      if (!message.author.bot && user) {
        const xp = Math.ceil(Math.random() * (5 * 10));
        const level = bot.utils.calculateXp(user.xp);
        const newLevel = bot.utils.calculateXp(user.xp + xp);

        if (newLevel > level) {
          if (guild?.level_data.enabled) {
            const embed = bot.utils
              .baseEmbed(message)
              .setTitle(lang.LEVELS.LEVEL_UP)
              .addField(lang.LEVELS.NEW_LEVEL, newLevel.toString())
              .addField(lang.LEVELS.TOTAL_XP, bot.utils.formatNumber(user.xp + xp));

            const ch = message.channel;
            if (
              !ch
                .permissionsFor(message.guild.me)
                .has([DJS.Permissions.FLAGS.SEND_MESSAGES, DJS.Permissions.FLAGS.EMBED_LINKS])
            ) {
              return;
            }

            const msg = await ch.send({ embeds: [embed] });
            if (!msg) return;

            setTimeout(() => {
              if (!msg) return;
              msg.deletable && msg?.delete();
            }, 10_000);
          }
        }

        await bot.utils.updateUserById(userId, guildId, { xp: user.xp + xp });
      }

      // bot mention
      if (mentions?.first()?.id === bot.user.id) {
        const embed = bot.utils
          .baseEmbed(message)
          .setTitle("Quick Info")
          .addField("Help command", "/help")
          .addField(lang.MESSAGE.SUPPORT, "https://discord.gg/XxHrtkA")
          .addField(
            lang.BOT.DASHBOARD,
            process.env["NEXT_PUBLIC_DASHBOARD_URL"] ?? "https://ghostybot.caspertheghost.me",
          );

        return message.channel.send({ embeds: [embed] });
      }

      if (
        !message.channel.permissionsFor(message.guild.me)?.has(DJS.Permissions.FLAGS.EMBED_LINKS) &&
        bot.user.id !== message.author.id
      ) {
        return message.channel.send({
          content: `Error: I need \`${DJS.Permissions.FLAGS.EMBED_LINKS}\` to work!`,
        });
      }

      const [cmd] = message.content.trim().split(/ +/g);
      const [prefix, ...cmdName] = cmd.split("");
      const command = cmdName.join("");

      if (prefix === guild.prefix && command === "help") {
        await this.helpCommand(message, lang);
      }
    } catch (err) {
      bot.utils.sendErrorLog(err, "error");
    }
  }

  async helpCommand(message: DJS.Message, lang: any) {
    const LINK = hyperlink(
      "Click here for a full command list",
      "https://github.com/Dev-CasperTheGhost/ghostybot/blob/main/docs/COMMANDS.md",
    );

    const embed = this.bot.utils
      .baseEmbed(message)
      .setTitle(lang.HELP.HELP)
      .setDescription(
        "Regular commands are now fully removed from GhostyBot. Please use slash commands instead.",
      )
      .addField(
        "Why slash commands",
        "Discord has announced a new [Intent](https://support-dev.discord.com/hc/en-us/articles/4404772028055) which will require all/most verified bots to transition over to slash commands. I think this is a good privacy change.",
      )
      .addField(lang.HELP.FULL_CMD_LIST, LINK);

    await message.channel.send({ embeds: [embed] });
  }
}
