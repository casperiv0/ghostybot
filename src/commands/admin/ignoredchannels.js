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
    const guildId = message.guild.id;
    const option = args[0];
    const item = message.mentions.channels.first() || message.channel;

    const guild = await getGuildById(guildId);
    const ignoredChannels = guild?.ignored_channels;

    if (!option) {
      return message.channel.send(
        "Please provide an valid option (`add`, `remove`)"
      );
    }

    if (!item) {
      return message.channel.send("Please provide a channel");
    }

    switch (option.toLowerCase()) {
      case "add":
        if (ignoredChannels.includes(item.id)) {
          return message.channel.send(
            "That channel is already ignored by the bot"
          );
        }

        await updateGuildById(guildId, {
          ignored_channels: [...ignoredChannels, item.id],
        });

        message.channel.send(`Added ${item} to ignored channels`);
        break;
      case "remove":
        if (!ignoredChannels.includes(item.id)) {
          return message.channel.send("That channel is not ignored by the bot");
        }

        await updateGuildById(guildId, {
          ignored_channels: ignoredChannels.filter((ci) => ci !== item.id),
        });

        return message.channel.send(`Remove ${item} from ignored channels`);
      default:
        return message.channel.send(`\`${option}\` is not a option!`);
    }
  },
};
