const ms = require("ms");

module.exports = {
  name: "givstart",
  description: "Starts a giveaway",
  category: "giveaway",
  usage: "givstart <time> <winner count> <price>\n **Example:** !givstart 2d 10 Discord nitro",
  memberPermissions: ["MANAGE_GUILD"],
  aliases: ["gstart"],
  execute(bot, message, args) {
    const time = args[0];
    const winnerCount = args[1];
    const prize = args.slice(2).join(" ");

    if (!time) {
      return message.channel.send("Please provide an end time");
    }

    if (!winnerCount) {
      return message.channel.send("Please provide a winner count");
    }

    if (!prize) {
      return message.channel.send("Please provide a prize");
    }

    bot.giveawayManager.start(message.channel, {
      time: ms(time),
      prize: prize,
      winnerCount: winnerCount,
      messages: {
        giveaway: "**🎉🎉 New Giveaway 🎉🎉**",
        giveawayEnded: "**GIVEAWAY ENDED**",
        timeRemaining: "Time remaining: **{duration}**!",
        inviteToParticipate: "React with 🎉 to participate!",
        winMessage: "Congratulations, {winners}! You won **{prize}**!",
        embedFooter: "Giveaways",
        noWinner: "Giveaway cancelled, no valid participations.",
        hostedBy: "Hosted by: {user}",
        winners: "winner(s)",
        endedAt: "Ended at",
        units: {
          seconds: "seconds",
          minutes: "minutes",
          hours: "hours",
          days: "days",
          pluralS: false,
        },
      },
    });
  },
};
