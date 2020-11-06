const BaseEmbed = require("../../modules/BaseEmbed");

module.exports = {
  name: "afk",
  aliases: ["setafk", "makemeafk"],
  category: "util",
  description: "",
  async execute(bot, message, args) {
    if (bot.afk.has(message.author.id)) {
      return message.channel.send("You are already afk!");
    }

    const reason = args.join(" ");

    const options = {
      reason: `${reason || "AFK"}`,
      user_id: message.author.id,
    };

    bot.afk.set(message.author.id, options);

    const embed = BaseEmbed(message).setDescription(
      `You are now afk!\nReason: ${options.reason}`
    );

    message.channel.send(embed);
  },
};
