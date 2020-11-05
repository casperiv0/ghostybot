/* eslint-disable no-case-declarations */
const ms = require("ms");

module.exports = {
  name: "giveaway",
  description: "Start or end a giveaway",
  category: "admin",
  options: ["start", "end"],
  usage:
    "giveaway <option> <time> <winner count> <price> \n **Example start:** !giveaway start 2d 10 Discord nitro \n **Example end:** !giveaway end <messageId> ",
  memberPermissions: ["MANAGE_GUILD"],
  execute(bot, message, args) {
    const option = args[0];
    const time = args[1];
    const winnerCount = args[2];
    const prize = args.slice(3).join(" ");

    switch (option) {
      case "start":
        bot.giveawayManager.start(message.channel, {
          time: ms(time),
          prize: prize,
          winnerCount: winnerCount,
        });
        break;

      case "end":
        const messageId = args[1];
        bot.giveawayManager
          .delete(messageId)
          .catch(() =>
            message.channel.send(`No giveaway found with id: ${messageId}`)
          );
        break;

      default:
        return message.channel.send(`${option} is not a valid option`);
    }
  },
};
