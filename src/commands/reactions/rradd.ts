import { Message, Role, TextChannel } from "discord.js";
import Command from "../../structures/Command";
import Bot from "../../structures/Bot";
import ReactionsModel, { Reaction } from "../../models/Reactions.model";

export default class RrAddCommand extends Command {
  constructor(bot: Bot) {
    super(bot, {
      name: "rradd",
      description: "Add a reaction role",
      category: "reactions",
      usage: "<channel_id>",
      memberPermissions: ["ADMINISTRATOR"],
      botPermissions: ["MANAGE_ROLES", "ADD_REACTIONS", "MANAGE_MESSAGES"],
      requiredArgs: [{ name: "channel_id" }],
    });
  }

  async execute(bot: Bot, message: Message, args: string[]) {
    const lang = await bot.utils.getGuildLang(message.guild?.id);
    try {
      let emojis: string[] | null = null;
      let roles: Role[] | null = null;
      const [channelId] = args;
      const { guild } = message;
      if (!guild) return;
      const filter = (m: Message) => message.author.id === m.author.id;

      const channel = guild.channels.cache.get(channelId);
      if (!channel) {
        return message.channel.send(
          lang.REACTIONS.CHANNEL_NOT_FOUND.replace("{channelId}", channelId)
        );
      }

      message.channel.send(lang.REACTIONS.ROLES);

      const roleMsgs = await message.channel.awaitMessages(filter, {
        time: 600000,
        max: 1,
        errors: ["time"],
      });
      const roleMsg = roleMsgs.first();
      if (!roleMsg) return;
      roles = await this.parseRoles(roleMsg, bot);

      if (!roles?.[0]) {
        return message.channel.send(lang.REACTIONS.NO_ROLE);
      }

      message.channel.send(lang.REACTIONS.EMOJIS);

      const emojiMsgs = await message.channel.awaitMessages(filter, {
        time: 600000,
        max: 1,
        errors: ["time"],
      });
      const emojiMsg = emojiMsgs.first();
      if (!emojiMsg) return;
      emojis = this.parseEmojis(emojiMsg);

      if (!emojis?.[0]) {
        return message.channel.send(lang.REACTIONS.VALID_EMOJI);
      }

      const embed = bot.utils
        .baseEmbed(message)
        .setTitle(lang.REACTIONS.TITLE)
        .setDescription(`${lang.REACTIONS.DESC}\n ${this.createDescription(roles, emojis)}`);

      const msg = await (channel as TextChannel).send(embed);

      emojis.forEach((em: string) => {
        msg.react(em);
      });

      const reactions: Reaction[] = [];

      for (let i = 0; i < roles.length; i++) {
        reactions.push({ role_id: roles[i].id, emoji: emojis[i].toString() });
      }

      const newRR = new ReactionsModel({
        guild_id: guild.id,
        message_id: msg.id,
        reactions: reactions,
        channel_id: channelId,
      });

      newRR.save();

      return message.channel.send(lang.REACTIONS.SUCCESS);
    } catch (err) {
      bot.utils.sendErrorLog(err, "error");
      return message.channel.send(lang.GLOBAL.ERROR);
    }
  }

  parseEmojis(message: Message) {
    let content = message.content.trim().split(/ +/g);

    content = content.filter((s) => {
      // Remove custom emojis
      if (s.split(":").length === 1 ? false : true) {
        return false;
      }
      return true;
    });

    return [...new Set(content)];
  }

  async parseRoles(msg: Message, bot: Bot): Promise<Role[]> {
    const content = msg.content.trim().split(/ +/g);

    // Remove any duplicates
    const filtered = [...new Set(content)];

    const roles: Role[] = [];

    filtered.forEach(async (r) => {
      const role = await bot.utils.findRole(msg, r);
      if (!role) return;

      roles.push(role);
      return role;
    });

    return roles;
  }

  createDescription(roles: Role[], emojis: string[]) {
    const strings: string[] = [];

    for (let i = 0; i < roles.length; i++) {
      strings.push(`${emojis[i]}: ${roles[i]}`);
    }

    return strings.join("\n");
  }
}
