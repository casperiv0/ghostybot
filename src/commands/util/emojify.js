const mapping = {
  ' ': '   ',
  '0': ':zero:',
  '1': ':one:',
  '2': ':two:',
  '3': ':three:',
  '4': ':four:',
  '5': ':five:',
  '6': ':six:',
  '7': ':seven:',
  '8': ':eight:',
  '9': ':nine:',
  '!': ':grey_exclamation:',
  '?': ':grey_question:',
  '#': ':hash:',
  '*': ':asterisk:'
};

'abcdefghijklmnopqrstuvwxyz'.split('').forEach(c => {
  mapping[c] = mapping[c.toUpperCase()] = ` :regional_indicator_${c}:`;
});

module.exports = {
  name: "emojify",
  aliases: ["texttoemoji"],
  usage: "emojify <text>",
  description: "Returns provided text in emojify (emotes) form.",
  category: "util",
  async execute(bot, message, args) {

    if (!args.length) {
      return message.channel.send("Please provide some text to convert it to emoji !");
    }

  message.channel.send(args.split('').map(c => mapping[c] || c).join(''));
  },
};
