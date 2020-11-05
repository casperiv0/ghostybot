const {
  getGuildById,
  getSticky,
  getUserById,
  updateUserById,
} = require("../utils/functions");
const queue = new Map();
const { MessageEmbed } = require("discord.js");
const { ownerId } = require("../../config.json");

module.exports = {
  name: "message",
  async execute(bot, message) {
    if (message.channel.type === "dm") return;
    const guildId = message.guild.id;
    const userId = message.author.id;
    const cooldowns = bot.cooldowns;
    const guild = await getGuildById(guildId);
    const blacklistedWords = guild.blacklistedwords;

    const escapeRegex = (str) => str.replace(/[.*+?^${}()|[\]\\]/g, "\\$&");
    const serverPrefix = guild.prefix;
    const prefix = new RegExp(
      `^(<@!?${bot.user.id}>|${escapeRegex(serverPrefix)})\\s*`
    );

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
      await updateUserById(userId, guildId, { xp: user.xp + xp });
    }

    // check if message has a badword in it
    if (!message.content.includes("!blacklistedwords") && !message.author.bot) {
      blacklistedWords !== null &&
        blacklistedWords.forEach((word) => {
          if (message.content.toLowerCase().includes(word.toLowerCase())) {
            message.delete();
            return message
              .reply(
                "You used a bad word the admin has set, therefore your message was deleted!"
              )
              .then((msg) => {
                setTimeout(() => {
                  msg.delete();
                }, 5000);
              });
          }
        });
    }

    // Commands
    if (
      !prefix.test(message.content) ||
      message.author.bot ||
      userId === bot.user.id
    )
      return;

    const [, matchedPrefix] = message.content.match(prefix);
    const args = message.content.slice(matchedPrefix.length).trim().split(/ +/);
    const command = args.shift().toLowerCase();
    const customCmds = guild?.custom_commands;

    if (message.mentions.has(bot.user.id) && !command) {
      const embed = new MessageEmbed()
        .setTitle("Quick Info")
        .addField("Prefix", serverPrefix)
        .addField("Support", "https://discord.gg/XxHrtkA")
        .addField("Vote on top.gg", "https://top.gg/bot/632843197600759809")
        .setColor("BLUE");

      message.channel.send(embed);
    }

    // if (blacklistedUsers !== null) {
    //   const isBlacklisted = blacklistedUsers.filter(
    //     (u) => u.user.id === message.author.id
    //   )[0];

    //   if (isBlacklisted) {
    //     return message.reply("You've been blacklisted from using this bot.");
    //   }
    // }

    if (customCmds) {
      const customCmd = customCmds.find((x) => x.name === command);
      if (customCmd) message.channel.send(customCmd.response);
    }

    // music queue
    const serverQueue = queue.get(message.guild.id);

    try {
      const cmd =
        bot.commands.get(command) || bot.commands.get(bot.aliases.get(command));

      if (bot.commands.has(cmd?.name)) {
        const now = Date.now();
        const timestamps = cooldowns.get(cmd.name);
        const cooldownAmount = cmd.cooldown * 1000;

        if (cmd.ownerOnly && message.author.id !== ownerId) {
          return message.reply("This command can only be used by the owner!");
        }

        if (timestamps.has(userId)) {
          const expTime = timestamps.get(userId) + cooldownAmount;

          if (now < expTime) {
            const timeleft = (expTime - now) / 1000;
            return message.reply(
              `Please wait **${timeleft.toFixed(
                1
              )}** more seconds before using the **${cmd.name}** command`
            );
          }
        }

        timestamps.set(userId, now);
        setTimeout(() => timestamps.delete(userId), cooldownAmount);

        cmd.execute(bot, message, args, serverQueue, queue);
      } else {
        return;
      }
    } catch (e) {
      // sendToDev(message, bot, e);
      console.log({ message: message.content, e });
    }
  },
};
