const cowsay = require("cowsay");

module.exports = {
  name: "cowsay",
  description: "Let a cow say something",
  usage: "<text>",
  category: "animal",
  requiredArgs: ["text"],
  execute(bot, message, args) {
    const text = args.join(" ");

    message.channel.send(
      `\`\`\` ${cowsay.say({ text, T: "U", e: "oO" })} \`\`\``
    );
  },
};
