import { Message, TextChannel } from "discord.js";
import BlacklistedModel, { IBlacklist } from "../../models/Blacklisted.model";
import Bot from "../../structures/Bot";
import Event from "../../structures/Event";

export default class MessageEvent extends Event {
  async execute(bot: Bot, message: Message) {
    if (!message?.guild?.available || !message.guild) return;
    if (message.channel.type === "dm") return;
    if (!bot.user) return;
    if (!message.guild?.me) return;

    const guildId = message?.guild?.id;
    const userId = message?.author?.id;
    const guild = await bot.utils.getGuildById(guildId);
    const mentions = message.mentions.members;
    const blacklistedUsers: IBlacklist[] = await BlacklistedModel.find();

    const escapeRegex = (str?: string) => str?.replace(/[.*+?^${}()|[\]\\]/g, "\\$&");
    const prefixReg = new RegExp(`^(<@!?${bot?.user?.id}>|${escapeRegex(guild?.prefix)})\\s*`);

    const prefixArr = message.content.match(prefixReg);
    const prefix = prefixArr?.[0];
    if (!prefix) return; // prefix didn't match

    // sticky
    const sticky = await bot.utils.getSticky(message.channel.id);
    const isSticky = message.channel.id === sticky?.channel_id;

    if (isSticky) {
      if (!sticky) return;
      if (message.author.bot || message.content === sticky?.message) return;

      const msg = message.channel.messages.cache.get(sticky?.message_id);
      if (msg) {
        msg?.delete();
      }

      const stickyMessage = await message.channel.send(sticky?.message);
      sticky.message_id = stickyMessage.id;
      await sticky?.save();
    }

    // check if mention user is afk
    if (mentions && mentions?.size > 0 && !prefixReg.test(message.content)) {
      mentions.forEach(async (member) => {
        const user = await bot.utils.getUserById(member.user.id, guildId);

        if (user?.afk?.is_afk) {
          message.channel.send(
            bot.utils
              .baseEmbed(message)
              .setTitle("AFK!")
              .setDescription(`${member.user.tag} is AFK!\n **Reason:** ${user?.afk?.reason}`)
          );
        }
      });
    }

    // LEVEL
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
            .setTitle("Level Up!")
            .addField("New level", newLevel)
            .addField("Total xp", user.xp + xp);

          const msg = await message.channel.send(embed);
          if (!msg) return;

          setTimeout(() => {
            if (!msg) return;
            msg?.delete();
          }, 10_000);
        }
      }

      await bot.utils.updateUserById(userId, guildId, { xp: user.xp + xp });
    }

    if (!prefixReg.test(message.content) || message.author.bot || userId === bot.user.id) return;
    const [cmd, ...args] = message.content.slice(prefix?.length).trim().split(/ +/g);

    if (blacklistedUsers) {
      const isBlacklisted = blacklistedUsers.find((u) => u.user_id === userId);

      if (isBlacklisted) {
        return message.reply("You've been blacklisted from using this bot.");
      }
    }

    // Bot mention
    if (mentions?.has(bot.user.id) && !cmd) {
      const embed = bot.utils
        .baseEmbed(message)
        .setTitle("Quick Info")
        .addField("Prefix", guild?.prefix)
        .addField("Support", "https://discord.gg/XxHrtkA")
        .addField("Dashboard", bot.config.dashboard.dashboardUrl);

      return message.channel.send({ embed });
    }

    try {
      const command = bot.commands.get(cmd) || bot.commands.get(bot.aliases.get(cmd)!);
      if (!command) return;

      const timestamps = bot.cooldowns.get(command.name);
      const now = Date.now();
      const cooldown = command.options.cooldown ? command?.options?.cooldown * 1000 : 3000;

      if (guild?.disabled_categories?.includes(command.options.category)) {
        return message.channel.send(
          `That command is disabled because this guild disabled the ${command.options.category} category`
        );
      }

      if (guild?.disabled_commands?.includes(command.name)) {
        return message.channel.send("That command was disabled for this guild");
      }

      if (command.options.ownerOnly && !bot.config.owners.includes(message.author.id)) {
        return message.reply("This command can only be used by the owners!");
      }

      if (command?.options.nsfwOnly === true && !message.channel.nsfw) {
        return message.channel.send("This channel is not a NSFW channel!");
      }

      if (command.options.memberPermissions) {
        const neededPerms: string[] = [];
        command.options.memberPermissions.forEach((perm) => {
          if (!(message.channel as TextChannel).permissionsFor(message.member!)?.has(perm)) {
            neededPerms.push(perm);
          }
        });

        if (neededPerms.length > 0) {
          return message.channel.send(
            `You need: ${neededPerms.map((p) => `\`${p.toUpperCase()}\``).join(", ")} permissions`
          );
        }
      }

      if (command.options.botPermissions) {
        const neededPerms: string[] = [];
        command.options.botPermissions.forEach((perm) => {
          if (!(message.channel as TextChannel).permissionsFor(message.guild!.me!)?.has(perm)) {
            neededPerms.push(perm);
          }
        });

        if (neededPerms.length > 0) {
          return message.channel.send(bot.utils.errorEmbed(neededPerms, message));
        }
      }

      if (command.options.requiredArgs && args.length < command.options.requiredArgs.length) {
        const cmdArgs = command.options.requiredArgs.map((a) => `\`${a}\``).join(", ");
        const cmdExample = `${prefix}${command.options.name} ${command.options.requiredArgs
          .map((a) => `<${a}>`)
          .join(" ")}`;

        const embed = bot.utils
          .baseEmbed(message)
          .setTitle("Incorrect command usage")
          .setColor("RED")
          .setDescription(`:x: You must provide more args: ${cmdArgs}`)
          .addField("Example:", cmdExample);

        return message.channel.send(embed);
      }

      if (timestamps?.has(userId)) {
        const userTime = timestamps.get(userId);
        const expireTime = userTime! + cooldown;

        if (now < expireTime) {
          const timeLeft = (expireTime - now) / 1000;

          return message.reply(
            `Please wait **${timeLeft.toFixed(1)}** more seconds before using the **${
              command.name
            }** command`
          );
        }
      }

      timestamps?.set(userId, now);
      setTimeout(() => timestamps?.delete(userId), cooldown);

      command.execute(bot, message, args);
    } catch (e) {
      console.log(e);

      bot.utils.sendErrorLog(e, "error");
      return message.channel.send("An unexpected error occurred");
    }
  }
}
