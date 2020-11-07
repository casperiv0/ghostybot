const BaseEmbed = require("../../modules/BaseEmbed");

module.exports = {
  name: "afk",
  aliases: ["setafk", "makemeafk"],
  category: "util",
  description: "",
  async execute(bot, message, args) {
    if (bot.afk.has(message.author.id)) {
      bot.afk.delete(message.author.id);

      const embed = BaseEmbed(message)
        .setTitle("Success")
        .setDescription("You are not afk anymore");

      return message.channel.send(embed);
    }

    const reason = args.join(" ");

    const options = {
      reason: `${reason || "Not specified"}`,
      user_id: message.author.id,
    };

    bot.afk.set(message.author.id, options);

    const embed = BaseEmbed(message)
      .setTitle("Success")
      .setDescription(`You are now afk!\n**Reason:** ${options.reason}`);

    message.channel.send(embed);
  },
};
