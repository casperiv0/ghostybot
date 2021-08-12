import * as DJS from "discord.js";
import { Bot } from "structures/Bot";
import { Event } from "structures/Event";

export default class MessageEvent extends Event {
  constructor(bot: Bot) {
    super(bot, "messageCreate");
  }

  async execute(bot: Bot, message: DJS.Message) {
    try {
      if (!message?.guild?.available || !message.guild) return;
      if (message.channel.type === "DM") return;
      if (!bot.user) return;
      if (!message.guild?.me) return;
      if (!bot.utils.hasSendPermissions(message)) return;

      const guildId = message?.guild?.id;
      const userId = message?.author?.id;

      const guild = await bot.utils.getGuildById(guildId);
      // an error occurred
      if (!guild) return;

      const lang = await bot.utils.getGuildLang(guildId);
      const user = await bot.utils.getUserById(userId, guildId);
      const mentions = message.mentions.members;

      if (guild?.ignored_channels?.includes(message.channel.id)) return;

      const escapeRegex = (str?: string) => str?.replace(/[.*+?^${}()|[\]\\]/g, "\\$&");
      const prefixReg = new RegExp(`^(<@!?${bot?.user?.id}>|${escapeRegex(guild?.prefix)})\\s*`);

      const prefixArr = message.content.match(prefixReg);
      const prefix = prefixArr?.[0];

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
      // todo: remove `prefixReg.test..` once message intents arrive
      if (mentions && mentions?.size > 0 && !prefixReg.test(message.content)) {
        mentions.forEach(async (member) => {
          const user = await bot.utils.getUserById(member.user.id, guildId);

          if (user?.afk?.is_afk) {
            const embed = bot.utils
              .baseEmbed(message)
              .setTitle("AFK!")
              .setDescription(
                lang.MESSAGE.USER_IS_AFK.replace("{tag}", member.user.tag).replace(
                  "{reason}",
                  `${user?.afk.reason}`,
                ),
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

        const embed = bot.utils
          .baseEmbed(message)
          .setDescription(lang.MESSAGE.NOT_AFK_ANYMORE.replace("{tag}", message.author.tag));

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

      if (!prefix) return; // prefix didn't match
      if (!prefixReg.test(message.content) || message.author.bot || userId === bot.user.id) return;
      const [arg, ...args] = message.content.slice(prefix?.length).trim().split(/ +/g);
      const cmd = arg.toLowerCase();

      // bot mention
      if (mentions?.has(bot.user.id) && !cmd) {
        const embed = bot.utils
          .baseEmbed(message)
          .setTitle("Quick Info")
          .addField(lang.GUILD.PREFIX, guild?.prefix)
          .addField(lang.MESSAGE.SUPPORT, "https://discord.gg/XxHrtkA")
          .addField(
            lang.BOT.DASHBOARD,
            process.env["NEXT_PUBLIC_DASHBOARD_URL"] ?? "https://ghostybot.caspertheghost.me",
          );

        return message.channel.send({ embeds: [embed] });
      }

      const command = bot.utils.resolveCommand(cmd);
      if (!command) return;

      if (
        !message.channel.permissionsFor(message.guild.me)?.has(DJS.Permissions.FLAGS.EMBED_LINKS) &&
        bot.user.id !== message.author.id
      ) {
        return message.channel.send({
          content: `Error: I need \`${DJS.Permissions.FLAGS.EMBED_LINKS}\` to work!`,
        });
      }

      const timestamps = bot.cooldowns.get(command.name);
      const now = Date.now();
      const cooldown = command.options.cooldown ? command?.options?.cooldown * 1000 : 3000;

      if (timestamps?.has(userId)) {
        const userTime = timestamps.get(userId);
        const expireTime = userTime! + cooldown;

        if (now < expireTime) {
          const timeLeft = (expireTime - now) / 1000;

          return message.reply({
            content: lang.MESSAGE.COOLDOWN_AMOUNT.replace(
              "{time}",
              `${timeLeft.toFixed(1)}`,
            ).replace("{command}", command.name),
          });
        }
      }

      timestamps?.set(userId, now);
      setTimeout(() => timestamps?.delete(userId), cooldown);

      await command.execute(message, args);
    } catch (err) {
      bot.utils.sendErrorLog(err, "error");
    }
  }
}
