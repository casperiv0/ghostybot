require("moment-duration-format");
const { getUserById, updateUserById } = require("../../utils/functions");
const jobs = require("../../data/jobs.json");
const { MessageEmbed } = require("discord.js");
const moment = require("moment");

module.exports = {
  name: "work",
  description: "work",
  category: "economy",
  async execute(bot, message) {
    const member = message.author;
    const timeout = 3600000;

    const { user } = await getUserById(member.id, message.guild.id);
    const work = user.work;

    if (work !== null && timeout - (Date.now() - work) > 0) {
      const timeUntilWork = moment(timeout - (Date.now() - work)).format(
        "H [hrs], m [mins], s [secs]"
      );
      message.channel.send(
        `You have already worked recently, ${timeUntilWork} remaining`
      );
    } else {
      const { name, amount } = jobs[Math.floor(Math.random() * jobs.length)];

      const embed = new MessageEmbed()
        .setTitle("Work!")
        .setDescription(
          `${member.username} worked as a **${name}** and earned **${amount}**! 💰`
        )
        .setColor("BLUE");

      message.channel.send(embed);

      console.log(amount);

      console.log(user.money);
      await updateUserById(member.id, message.guild.id, {
        money: user.money + amount,
        work: Date.now(),
      });
    }
  },
};
