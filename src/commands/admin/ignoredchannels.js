/* eslint-disable no-case-declarations */
const { updateGuildById, getGuildById } = require("../../utils/functions");

module.exports = {
  name: "ignoredchannels",
  description: "Add/remove ignored channels",
  category: "admin",
  usage: "set <option> <channel>",
  options: ["add", "remove"],
  memberPermissions: ["ADMINISTRATOR"],
  aliases: ["igch", "ic"],
  async execute(bot, message, args) {
    const lang = await bot.getGuildLang(message.guild.id);
    const guildId = message.guild.id;
    const option = args[0];
    const item = message.mentions.channels.first() || message.channel;

    const guild = await getGuildById(guildId);
    const ignoredChannels = guild?.ignored_channels;

    if (!option) {
      return message.channel.send(lang.ADMIN.VALID_OPTION);
    }

    if (!item) {
      return message.channel.send(lang.ADMIN.PROVIDE_CHANNEL);
    }

    switch (option.toLowerCase()) {
      case "add":
        if (ignoredChannels.includes(item.id)) {
          return message.channel.send(lang.ADMIN.CHANNEL_ALREADY_IGNORED);
        }

        await updateGuildById(guildId, {
          ignored_channels: [...ignoredChannels, item.id],
        });

        message.channel.send(lang.ADMIN.ADD_TO_IGNORE.replace("{item}", item));
        break;
      case "remove":
        if (!ignoredChannels.includes(item.id)) {
          return message.channel.send(lang.ADMIN.CHANNEL_NOT_IGNORED);
        }

        await updateGuildById(guildId, {
          ignored_channels: ignoredChannels.filter((ci) => ci !== item.id),
        });

        return message.channel.send(lang.ADMIN.REMOVE_IGNORED.replace("{item}", item));
      default:
        return message.channel.send(lang.ADMIN.NOT_A_OPTION.replace("{option}", option));
    }
  },
};
