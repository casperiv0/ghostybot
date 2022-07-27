import * as DJS from "discord.js";
import { ChannelType } from "discord.js";
import { Bot } from "structures/Bot";
import { Event } from "structures/Event";
import { prisma } from "utils/prisma";

export default class MessageEvent extends Event {
  constructor(bot: Bot) {
    super(bot, "messageCreate");
  }

  async execute(bot: Bot, message: DJS.Message) {
    try {
      if (!message.guild?.available) return;
      if (message.channel.type === ChannelType.DM) return;
      if (!bot.utils.hasSendPermissions(message)) return;

      if (!bot.user) return;

      const me = this.bot.utils.getMe(message.guild);
      if (!me) return;

      const guildId = message.guild.id;
      const userId = message.author.id;

      const guild = await bot.utils.getGuildById(guildId);
      // an error occurred
      if (!guild) return;

      const lang = await bot.utils.getGuildLang(guildId);
      const user = await bot.utils.getUserById(userId, guildId);
      const mentions = message.mentions.members;

      if (guild.ignored_channels.includes(message.channel.id)) return;

      // sticky
      const sticky = await bot.utils.getSticky(message.channel.id);
      const isSticky = message.channel.id === sticky?.channel_id;

      if (isSticky) {
        if (!sticky) return;
        if (message.author.bot || message.content === sticky.message) return;
        if (!message.channel.permissionsFor(me).has(DJS.PermissionFlagsBits.ViewChannel)) {
          return;
        }

        const msg = await message.channel.messages.fetch(sticky.message_id);
        if (msg) {
          msg.deletable && msg.delete();
        }

        const stickyMessage = await message.channel.send({
          content: sticky.message,
        });

        await prisma.stickies.update({
          where: { id: sticky.id },
          data: {
            message_id: stickyMessage.id,
          },
        });
      }

      // check if mention user is afk
      if (mentions && mentions.size > 0) {
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
      if (!message.author.bot && user?.afk?.is_afk) {
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
        if (user.xp >= Infinity) return;

        const xp = Math.ceil(Math.random() * (5 * 10));
        const level = bot.utils.calculateXp(user.xp);
        const newLevel = bot.utils.calculateXp(user.xp + xp);

        if (newLevel > level) {
          if (guild.level_data?.enabled) {
            const embed = bot.utils
              .baseEmbed(message)
              .setTitle(lang.LEVELS.LEVEL_UP)
              .addFields(
                { name: lang.LEVELS.NEW_LEVEL, value: newLevel.toString() },
                { name: lang.LEVELS.TOTAL_XP, value: bot.utils.formatNumber(user.xp + xp) },
                { name: lang.LEVELS.NEW_LEVEL, value: newLevel.toString() },
              );

            const ch = message.channel;
            if (
              !ch
                .permissionsFor(me)
                .has([DJS.PermissionFlagsBits.SendMessages, DJS.PermissionFlagsBits.EmbedLinks])
            ) {
              return;
            }

            const msg = await ch.send({ embeds: [embed] });
            if (!msg) return;

            setTimeout(() => {
              if (!msg) return;
              msg.deletable && msg.delete();
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
          .addFields(
            { name: "Help command", value: "/help" },
            { name: lang.MESSAGE.SUPPORT, value: "https://discord.gg/XxHrtkA" },
            {
              name: lang.BOT.DASHBOARD,
              value:
                process.env["NEXT_PUBLIC_DASHBOARD_URL"] ?? "https://ghostybot.caspertheghost.me",
            },
          );

        return message.channel.send({ embeds: [embed] });
      }
    } catch (err) {
      bot.utils.sendErrorLog(err, "error");
    }
  }
}
