import * as DJS from "discord.js";
import ms from "ms";
import { saveCommands } from "@commands/admin/disable";
import BlacklistedModel, { IBlacklist } from "models/Blacklisted.model";
import BotModel from "models/Bot.model";
import Bot from "structures/Bot";
import Event from "structures/Event";

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
      if (
        !message.channel.permissionsFor(message.guild.me)?.has(DJS.Permissions.FLAGS.SEND_MESSAGES)
      ) {
        return;
      }

      const guildId = message?.guild?.id;
      const userId = message?.author?.id;
      const guild = await bot.utils.getGuildById(guildId);
      // an error occurred
      if (!guild) return;
      const lang = await bot.utils.getGuildLang(guildId);
      const mentions = message.mentions.members;
      const blacklistedUsers: IBlacklist[] = await BlacklistedModel.find();
      const customCommands = guild?.custom_commands;

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
        await sticky?.save();
      }

      // check if message has a bad word in it
      if (!message.content.includes(`${guild?.prefix}blacklistedwords`) && !message.author.bot) {
        let hasBadWord = false;

        guild?.blacklistedwords.forEach((word) => {
          message.content.split(" ").forEach((messageWord) => {
            if (word.toLowerCase() === messageWord.toLowerCase()) {
              return (hasBadWord = true);
            }
          });
        });

        if (hasBadWord) {
          message.deletable && message.delete();
          const sentMsg = await message.channel.send({
            content: lang.MESSAGE.BAD_WORD.replace("{mention}", `<@${userId}>`),
          });

          setTimeout(() => {
            sentMsg.deletable && sentMsg.delete();
          }, 5000);
        }
      }

      // check if mention user is afk
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
      const user = await bot.utils.getUserById(userId, guildId);
      if (
        !message.author.bot &&
        user &&
        user?.afk.is_afk === true &&
        !message.content.includes(`${guild?.prefix}afk`)
      ) {
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
      if (!message.author.bot) {
        const user = await bot.utils.getUserById(userId, guildId);
        if (!user) return;
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

      if (blacklistedUsers) {
        const isBlacklisted = blacklistedUsers.find((u) => u.user_id === userId);

        if (isBlacklisted) {
          return message.reply({ content: lang.MESSAGE.BLACKLISTED });
        }
      }

      // bot mention
      if (mentions?.has(bot.user.id) && !cmd) {
        const embed = bot.utils
          .baseEmbed(message)
          .setTitle("Quick Info")
          .addField(lang.GUILD.PREFIX, guild?.prefix)
          .addField(lang.MESSAGE.SUPPORT, "https://discord.gg/XxHrtkA")
          .addField(
            lang.BOT.DASHBOARD,
            process.env["NEXT_PUBLIC_DASHBOARD_URL"] ?? "https://ghostybot.tk",
          );

        return message.channel.send({ embeds: [embed] });
      }

      if (customCommands) {
        if (guild?.auto_delete_cmd === true) {
          message.deletable && message?.delete();
        }

        const command = customCommands.find((c) => c.name === cmd);
        if (command) {
          return message.channel.send({ content: command.response });
        }
      }

      const command = bot.utils.resolveCommand(cmd);
      if (!command) return;

      if (command.options.category === "music") {
        return message.channel.send({
          content: "The music category is currently temporary disabled due to high loads.",
        });
      }

      if (
        !message.channel.permissionsFor(message.guild.me)?.has(DJS.Permissions.FLAGS.EMBED_LINKS) &&
        bot.user.id !== message.author.id
      ) {
        return message.channel.send({
          content: `Error: I need \`${DJS.Permissions.FLAGS.EMBED_LINKS}\` to work!`,
        });
      }

      const _bot =
        (await BotModel.findOne({ bot_id: bot.user.id })) ||
        (await BotModel.create({ bot_id: bot.user.id }));

      _bot.total_used_cmds = (_bot?.total_used_cmds || 0) + 1;
      _bot.used_since_up = (_bot?.used_since_up || 0) + 1;

      _bot.save();
      const timestamps = bot.cooldowns.get(command.name);
      const now = Date.now();
      const cooldown = command.options.cooldown ? command?.options?.cooldown * 1000 : 3000;

      if (
        !saveCommands.includes(command.name) &&
        guild?.disabled_categories?.includes(command.options.category)
      ) {
        return message.channel.send({
          content: lang.MESSAGE.CATEGORY_DISABLED.replace("{category}", command.options.category),
        });
      }

      if (guild?.disabled_commands?.includes(command.name)) {
        return message.channel.send({ content: lang.MESSAGE.COMMAND_DISABLED });
      }

      const owners = process.env["OWNERS"];

      if (command.options.ownerOnly && !owners?.includes(`${message.author.id}`)) {
        return message.reply({ content: lang.MESSAGE.OWNER_ONLY });
      }

      if (command.options.memberPermissions) {
        const neededPerms: bigint[] = [];
        command.options.memberPermissions.forEach((perm) => {
          if (!(message.channel as DJS.TextChannel).permissionsFor(message.member!)?.has(perm)) {
            neededPerms.push(perm);
          }
        });

        if (neededPerms.length > 0) {
          return message.channel.send({
            content: lang.MESSAGE.NEED_PERMS.replace(
              "{perms}",
              neededPerms
                .map((p) => {
                  const perms: string[] = [];
                  Object.keys(DJS.Permissions.FLAGS).map((key) => {
                    if (DJS.Permissions.FLAGS[key] === p) {
                      perms.push(`\`${lang.PERMISSIONS[key]}\``);
                    }
                  });

                  return perms;
                })
                .join(", "),
            ),
          });
        }
      }

      if (command.options.botPermissions) {
        const neededPerms: bigint[] = [];
        command.options.botPermissions.forEach((perm) => {
          if (!(message.channel as DJS.TextChannel).permissionsFor(message.guild!.me!)?.has(perm)) {
            neededPerms.push(perm);
          }
        });

        if (neededPerms.length > 0) {
          return message.channel.send({
            embeds: [bot.utils.errorEmbed(neededPerms, message, lang.PERMISSIONS)],
          });
        }
      }

      if (command.options.requiredArgs) {
        if (command.options.requiredArgs && args.length < command.options.requiredArgs.length) {
          const cmdArgs = command.options.requiredArgs.map((a) => `\`${a.name}\``).join(", ");
          const cmdExample = `${prefix}${command.options.name} ${command.options.requiredArgs
            .map((a) => `<${a.name}>`)
            .join(" ")}`;

          const embed = bot.utils
            .baseEmbed(message)
            .setTitle(lang.MESSAGE.INCORRECT_ARGS)
            .setColor("RED")
            .setDescription(`:x: ${lang.MESSAGE.REQUIRED_ARGS.replace("{args}", cmdArgs)}`)
            .addField(lang.MESSAGE.EXAMPLE, cmdExample);

          return message.channel.send({ embeds: [embed] });
        }

        let incorrectArg = false;
        command.options.requiredArgs.map((arg, i) => {
          switch (arg?.type) {
            case "number": {
              if (!Number(args[i])) {
                message.channel.send({ content: lang.MESSAGE.MUST_BE_NUMBER });
                return (incorrectArg = true);
              }
              break;
            }
            case "time": {
              if (!ms(args[i])) {
                message.channel.send({ content: lang.MESSAGE.MUST_BE_DATE });
                return (incorrectArg = true);
              }
              break;
            }
            default:
              break;
          }
        });

        if (incorrectArg) return;
      }

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

      if (command.options.typing === true) {
        message.channel.startTyping();
      }

      timestamps?.set(userId, now);
      setTimeout(() => timestamps?.delete(userId), cooldown);

      command.execute(message, args);
    } catch (err) {
      bot.utils.sendErrorLog(err, "error");
    } finally {
      message.channel.stopTyping(true);
    }
  }
}
