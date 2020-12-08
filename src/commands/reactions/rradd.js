const ReactionsModel = require("../../models/Reactions.model");
const BaseEmbed = require("../../modules/BaseEmbed");

module.exports = {
  name: "rradd",
  description: "Add a reaction role",
  category: "reactions",
  usage: "rradd <channel_id> <role_id || role mention> <emoji>",
  memberPermissions: ["ADMINISTRATOR"],
  botPermissions: ["MANAGE_ROLES", "ADD_REACTIONS", "MANAGE_MESSAGES"],
  async execute(bot, message, args) {
    const [channelId, , emoji] = args;
    const { guild } = message;
    const lang = await bot.getGuildLang(guild.id);
    const role =
      message.mentions.roles.first() ||
      guild.roles.cache.find((r) => r.id === args[1]);

    if (!channelId) {
      return message.channel.send(lang.REACTIONS.NO_CHANNEL_ID);
    }
    if (!emoji) {
      return message.channel.send(lang.REACTIONS.NO_EMOJI);
    }
    // THANKS TO @tovade
    if (emoji.split(":").length === 1 ? false : true) {
      return message.channel.send(lang.REACTIONS.NO_EMOJI);
    }

    if (!role) {
      return message.channel.send(lang.REACTIONS.NO_ROLE);
    }

    const channel = guild.channels.cache.get(channelId);
    if (!channel) {
      return message.channel.send(
        lang.REACTIONS.CHANNEL_NOT_FOUND.replace("{channelId}", channelId)
      );
    }

    const embed = BaseEmbed(message)
      .setTitle(lang.REACTIONS.TITLE)
      .setDescription(`${lang.REACTIONS.DESC}\n${emoji}: **${role.name}**`);
    const msg = await channel.send(embed);

    msg.react(emoji);

    const newRR = new ReactionsModel({
      guild_id: guild.id,
      message_id: msg.id,
      reaction: emoji,
      role_id: role.id,
      channel_id: channelId,
    });

    newRR.save();

    return message.channel.send(lang.REACTIONS.SUCCESS);
  },
};
