const cowsay = require("cowsay");

module.exports = {
  name: "cowsay",
  description: "Let a cow say something",
  category: "animal",
  async execute(bot, message, args) {
    const lang = await bot.getGuildLang(message.guild.id);
    const text = args.join(" ");

    if (!text) {
      return message.channel.send(lang.GLOBAL.PROVIDE_ARGS);
    }

    message.channel.send(
      `\`\`\` ${cowsay.say({ text, T: "U", e: "oO" })} \`\`\``
    );
  },
};
