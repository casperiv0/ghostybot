const Discord = require("discord.js");
const { parse } = require("twemoji-parser");
const { MessageEmbed } = require("discord.js");

module.exports = {
  name: "stealemoji",
  category: "admin",
  usage: "stealemoji <emoji> <custom name>",
  description: "Steal an emoji from a different server",
  async execute(bot, message, args) {
    if (!message.member.hasPermission("MANAGE_EMOJIS")) {
      return message.channel.send(
        "You Don't Have Permission To Use This Command! (Manage Emojis)"
      );
    }

    if (!message.guild.me.hasPermission("MANAGE_EMOJIS")) {
      return message.channel.send(
        "I don't have permissions to create emojis for this server (Manage Emojis)"
      );
    }

    const emoji = args[0];
    if (!emoji) return message.channel.send("Please Give Me A Emoji!");

    let customemoji = Discord.Util.parseEmoji(emoji);

    if (customemoji.id) {
      const Link = `https://cdn.discordapp.com/emojis/${customemoji.id}.${
        customemoji.animated ? "gif" : "png"
      }`;
      const name = args.slice(1).join(" ");

      message.guild.emojis.create(
        `${Link}`,
        `${name || `${customemoji.name}`}`
      );
      const Added = new MessageEmbed()
        .setTitle("Emoji Added")
        .setColor("BLUE")
        .setDescription(
          `Emoji Has Been Added! | Name : ${
            name || `${customemoji.name}`
          } | Preview : [Click Me](${Link})`
        );
      return message.channel.send(Added);
    } else {
      let CheckEmoji = parse(emoji, { assetType: "png" });
      if (!CheckEmoji[0])
        return message.channel.send("Please Give Me A Valid Emoji!");
      message.channel.send(
        "You Can Use Normal Emoji Without Adding In Server!"
      );
    }
  },
};
