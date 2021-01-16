const ReactionsModel = require("../../models/Reactions.model");
const BaseEmbed = require("../../modules/BaseEmbed");

module.exports = {
  name: "rradd",
  description: "Add a reaction role",
  category: "reactions",
  usage: "<channel_id>",
  memberPermissions: ["ADMINISTRATOR"],
  botPermissions: ["MANAGE_ROLES", "ADD_REACTIONS", "MANAGE_MESSAGES"],
  requiredArgs: ["channel_id"],
  async execute(bot, message, args) {
    let emojis = null;
    let roles = null;
    const [channelId] = args;
    const { guild } = message;
    const lang = await bot.utils.getGuildLang(guild.id);
    const filter = (m) => message.author.id === m.author.id;

    if (!channelId) {
      return message.channel.send(lang.REACTIONS.NO_CHANNEL_ID);
    }

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
    roles = parseRoles(roleMsg, bot);

    if (!roles[0]) {
      return message.channel.send(lang.REACTIONS.NO_ROLE);
    }

    message.channel.send(lang.REACTIONS.EMOJIS);

    const emojiMsgs = await message.channel.awaitMessages(filter, {
      time: 600000,
      max: 1,
      errors: ["time"],
    });
    const emojiMsg = emojiMsgs.first();
    emojis = parseEmojis(emojiMsg);

    if (!emojis[0]) {
      return message.channel.send(lang.REACTIONS.VALID_EMOJI);
    }

    const embed = bot.utils.baseEmbed(message)
      .setTitle(lang.REACTIONS.TITLE)
      .setDescription(`${lang.REACTIONS.DESC}\n ${createDescription(roles, emojis)}`);

    const msg = await channel.send(embed);

    emojis.forEach((em) => {
      msg.react(em);
    });

    const reactions = [];

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
  },
};

function createDescription(roles, emojis) {
  const strings = [];

  for (let i = 0; i < roles.length; i++) {
    strings.push(`${emojis[i]}: ${roles[i]}`);
  }

  return strings.join("\n");
}

function parseRoles(msg, bot) {
  const content = msg.content.trim().split(/ +/g);

  // Remove any duplicates
  const filtered = [...new Set(content)];

  let roles = [];

  filtered.forEach(async (r) => {
    const role = bot.findRole(msg, r.id);

    roles = [...roles, role.id];
    return role;
  });

  return roles;
}

function parseEmojis(msg) {
  let content = msg.content.trim().split(/ +/g);

  content = content.filter((s) => {
    // Remove custom emojis
    if (s.split(":").length === 1 ? false : true) {
      return false;
    }
    return true;
  });

  return [...new Set(content)];
}
