const BaseEmbed = require("../../modules/BaseEmbed");

module.exports = {
  name: "afk",
  aliases: ["setafk", "makemeafk"],
  category: "util",
  description: "",
  async execute(bot, message, args) {
    const reason = args.join(" ");

    const options = {
      reason: `${reason || "AFK"}`,
      user_id: message.author.id,
    };

    bot.afk.set(message.author.id, options);

    const embed = BaseEmbed(message).setDescription(`You are now afk!\nReason: ${options.reason}`);

    message.channel.send(embed);
  },
};
