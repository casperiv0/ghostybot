const ms = require("ms");

module.exports = {
  name: "givstart",
  description: "Starts a giveaway",
  category: "giveaway",
  usage:
    "givstart <time> <winner count> <price>\n **Example:** !givstart 2d 10 Discord nitro",
  memberPermissions: ["MANAGE_GUILD"],
  aliases: ["gstart"],
  execute(bot, message, args) {
    const time = args[0];
    const winnerCount = args[1];
    const prize = args.slice(2).join(" ");

    bot.giveawayManager.start(message.channel, {
      time: ms(time),
      prize: prize,
      winnerCount: winnerCount,
    });
  },
};
