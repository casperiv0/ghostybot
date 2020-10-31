const { MessageEmbed } = require("discord.js");

module.exports = {
  name: "afk",
  aliases: ["setafk", "makemeafk"],
  category: "util",
  description: "",
  async execute(bot, message, args) {
    let reason = args.join(" ");

    let options = {
      reason: `${reason || "AFK"}`,
      id: message.author.id,
      justafk: true,
    };

    bot.afk.set(message.author.id, options);

    const embed = new MessageEmbed()
      .setTimestamp()
      .setDescription(`You are now afk!\nReason: ${reason || "AFK"}`)
      .setColor("BLUE");

    message.channel.send(embed);

    if (message.member.nickname) {
      if (!message.member.nickname.includes("[AFK] ")) {
        message.member.setNickname(`[AFK] ${message.member.nickname}`);
      }
    } else {
      message.member.setNickname(`[AFK] ${message.author.username}`);
    }
  },
};
