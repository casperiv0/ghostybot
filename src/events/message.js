const {
  getGuildById,
  getSticky,
  getUserById,
  updateUserById,
  errorEmbed,
  calculateUserXp,
  sendErrorLog,
} = require("../utils/functions");
const queue = new Map();
const { owners } = require("../../config.json");
const BaseEmbed = require("../modules/BaseEmbed");
const Blacklist = require("../models/Blacklisted.model");
const UserModel = require("../models/User.model");
const { dashboard } = require("../../config.json");

module.exports = {
  name: "message",
  /**
   *
   * @param {import("discord.js").Client} bot
   * @param {import("discord.js").Message} message
   */
  async execute(bot, message) {
    if (message.channel.type === "dm") return;
    if (!message.channel.permissionsFor(message.guild.me).has("SEND_MESSAGES")) return;
    if (!message.guild.available) return;

    const guildId = message.guild.id;
    const userId = message.author.id;
    const cooldowns = bot.cooldowns;
    const guild = await getGuildById(guildId);
    const blacklistedWords = guild?.blacklistedwords;
    const blacklistedUsers = await Blacklist.find();
    const mentions = message.mentions.members;
    const disabledCommands = guild?.disabled_commands;
    const disabledCategories = guild?.disabled_categories;

    const ignoredChannels = guild?.ignored_channels;
    if (ignoredChannels.includes(message.channel.id)) return;

    const escapeRegex = (str) => str.replace(/[.*+?^${}()|[\]\\]/g, "\\$&");
    const serverPrefix = guild.prefix;
    const prefix = new RegExp(`^(<@!?${bot.user.id}>|${escapeRegex(serverPrefix)})\\s*`);

    // Check if sticky
    const sticky = await getSticky(message.channel.id);
    const isSticky = message.channel.id === sticky?.channel_id;

    if (isSticky) {
      if (message.author.bot || message.content === sticky.message) return;

      const fMessage = message.channel.messages.cache.get(sticky.message_id);
      if (fMessage) {
        fMessage.delete();
      }

      const stickyMessage = await message.channel.send(sticky?.message);
      sticky.message_id = stickyMessage.id;
      await sticky.save();
    }

    // xp - levels
    if (!message.author.bot) {
      const { user } = await getUserById(userId, guildId);
      const xp = Math.ceil(Math.random() * (5 * 10));
      const level = calculateUserXp(user.xp);
      const newLevel = calculateUserXp(user.xp + xp);

      if (newLevel > level) {
        if (guild.level_up_messages === true) {
          const embed = BaseEmbed(message)
            .setTitle("Level up!")
            .addField("New level", newLevel)
            .addField("Total xp", user.xp + xp);

          const msg = await message.channel.send(embed);
          const MSG_TIMEOUT_10_SECS = 10000;

          setTimeout(() => {
            msg?.delete();
          }, MSG_TIMEOUT_10_SECS);
        }
      }

      await updateUserById(userId, guildId, { xp: user.xp + xp });
    }

    // check if message has a badword in it
    if (!message.content.includes(`${guild.prefix}blacklistedwords`) && !message.author.bot) {
      blacklistedWords !== null &&
        blacklistedWords.forEach((word) => {
          if (message.content.toLowerCase().includes(word.toLowerCase())) {
            message.delete();
            return message
              .reply("You used a bad word the admin has set, therefore your message was deleted!")
              .then((msg) => {
                setTimeout(() => {
                  msg.delete();
                }, 5000);
              });
          }
        });
    }

    if (mentions && !prefix.test(message.content)) {
      mentions.forEach(async (member) => {
        const { user } = await getUserById(member.user.id, guildId);

        if (user.afk.is_afk === true) {
          const embed = BaseEmbed(message)
            .setTitle("AFK!")
            .setDescription(`${member.user.tag} is AFK!\n **Reason:** ${user.afk.reason}`);
          message.channel.send(embed);
        }
      });
    }

    // remove AFK from user if they send a message
    const user = await UserModel.findOne({ user_id: userId, guild_id: guildId });
    if (
      !message.author.bot &&
      user &&
      user?.afk.is_afk === true &&
      !message.content.includes(`${guild.prefix}afk`)
    ) {
      await updateUserById(userId, guildId, {
        afk: {
          is_afk: false,
          reason: null,
        },
      });

      const msg = await message.channel.send(
        BaseEmbed(message).setDescription(`**${message.author.tag}** is not afk anymore`)
      );

      setTimeout(() => {
        msg.delete();
      }, 5000);
    }

    // Commands
    if (!prefix.test(message.content) || message.author.bot || userId === bot.user.id) return;

    const [, matchedPrefix] = message.content.match(prefix);
    const args = message.content.slice(matchedPrefix.length).trim().split(/ +/g);
    const command = args.shift().toLowerCase();
    const customCmds = guild?.custom_commands;

    if (message.mentions.has(bot.user.id) && !command) {
      const embed = BaseEmbed(message)
        .setTitle("Quick Info")
        .addField("Prefix", serverPrefix)
        .addField("Support", "https://discord.gg/XxHrtkA")
        .addField("Vote on top.gg", "https://top.gg/bot/632843197600759809")
        .addField("Dashboard", dashboard.dashboardUrl);

      message.channel.send(embed);
    }

    if (blacklistedUsers) {
      const isBlacklisted = blacklistedUsers.find((u) => u.user_id === message.author.id);

      if (isBlacklisted) {
        return message.reply("You've been blacklisted from using this bot.");
      }
    }

    if (customCmds) {
      if (guild?.auto_delete_cmd === true) {
        message.delete();
      }

      const customCmd = customCmds.find((x) => x.name === command);
      if (customCmd) message.channel.send(customCmd.response);
    }

    // music queue
    const serverQueue = queue.get(message.guild.id);

    try {
      const cmd = bot.commands.get(command) || bot.commands.get(bot.aliases.get(command));

      if (bot.commands.has(cmd?.name)) {
        const now = Date.now();
        const timestamps = cooldowns.get(cmd.name);
        const cooldownAmount = cmd.cooldown * 1000;

        if (disabledCategories !== null && disabledCategories.length > 0) {
          if (disabledCategories?.includes(cmd.category)) {
            return message.channel.send(
              `That command is disabled because this guild disabled the ${cmd.category} category`
            );
          }
        }

        if (disabledCommands !== null && disabledCommands.length > 0) {
          if (disabledCommands?.includes(cmd.name)) {
            return message.channel.send("That command was disabled for this guild");
          }
        }

        if (cmd.ownerOnly && !owners.includes(message.author.id)) {
          return message.reply("This command can only be used by the owners!");
        }

        if (cmd.requiredArgs && args.length < cmd.requiredArgs.length) {
          const cmdArgs = cmd.requiredArgs.map((a) => `\`${a}\``).join(", ");
          const cmdExample = `${matchedPrefix}${cmd.name} ${cmd.requiredArgs
            .map((a) => `<${a}>`)
            .join(" ")}`;

          const embed = BaseEmbed(message)
            .setTitle("Incorrect command usage")
            .setColor("RED")
            .setDescription(`:x: You must provide more args: ${cmdArgs}`)
            .addField("Example:", cmdExample);

          return message.channel.send(embed);
        }

        // botPermissions
        if (cmd.botPermissions) {
          const neededPermissions = [];
          cmd.botPermissions.forEach((perm) => {
            if (!message.channel.permissionsFor(message.guild.me).has(perm)) {
              neededPermissions.push(perm);
            }
          });

          if (neededPermissions[0]) {
            return message.channel.send(errorEmbed(neededPermissions, message));
          }
        }

        // memberPermissions
        if (cmd.memberPermissions) {
          const neededPermissions = [];
          cmd.memberPermissions.forEach((perm) => {
            if (!message.channel.permissionsFor(message.member).has(perm)) {
              neededPermissions.push(perm);
            }
          });

          if (neededPermissions.length > 0) {
            return message.channel.send(
              `You need: ${neededPermissions
                .map((p) => `\`${p.toUpperCase()}\``)
                .join(", ")} permissions`
            );
          }
        }

        if (cmd.nsfwOnly && cmd.nsfwOnly === true && !message.channel.nsfw) {
          return message.channel.send("This channel is not a NSFW channel!");
        }

        if (timestamps.has(userId)) {
          const expTime = timestamps.get(userId) + cooldownAmount;

          if (now < expTime) {
            const timeleft = (expTime - now) / 1000;
            return message.reply(
              `Please wait **${timeleft.toFixed(1)}** more seconds before using the **${
                cmd.name
              }** command`
            );
          }
        }

        timestamps.set(userId, now);
        setTimeout(() => timestamps.delete(userId), cooldownAmount);

        if (guild?.auto_delete_cmd === true) {
          message.delete();
        }

        cmd.execute(bot, message, args, serverQueue, queue);
      } else {
        return;
      }
    } catch (e) {
      sendErrorLog(bot, e, "error", message.content);
      const embed = BaseEmbed(message).setTitle("Woah! Something went wrong").setDescription(e);

      message.channel.send(embed);
    }
  },
};
