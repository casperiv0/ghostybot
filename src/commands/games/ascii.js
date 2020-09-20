const figlet = require("figlet");

module.exports = {
  name: "ascii",
  description: "Transform text to ascii",
  category: "games",
  async execute(bot, message, args) {
    const text = args.join(" ");

    if (!text) {
      return message.channel.send("Please provide some text.");
    }

    figlet.text(text, (e, txt) => {
      if (e) return;
      message.channel.send(`\`\`\` ${txt.trimRight()} \`\`\``);
    });
  },
};
