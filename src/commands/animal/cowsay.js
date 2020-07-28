const cowsay = require("cowsay");

module.exports = {
  name: "cowsay",
  description: "Let a cow say something",
  category: "animal",
  async execute(bot, message, args) {
    const text = args.join(" ");

    if (!text) return message.channel.send("Please provide text");

    message.channel.send(`\`\`\` ${cowsay.say({ text, T: "U", e: "oO" })} \`\`\``);
  },
};
