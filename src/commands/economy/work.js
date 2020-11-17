const { getUserById, updateUserById } = require("../../utils/functions");
const jobs = require("../../data/jobs.json");
const moment = require("moment");
const BaseEmbed = require("../../modules/BaseEmbed");

module.exports = {
  name: "work",
  description: "work",
  category: "economy",
  async execute(bot, message) {
    const lang = await bot.getGuildLang(message.guild.id);
    const member = message.author;
    const timeout = 3600000;

    const { user } = await getUserById(member.id, message.guild.id);
    const work = user.work;

    if (work !== null && timeout - (Date.now() - work) > 0) {
      const timeUntilWork = moment(timeout - (Date.now() - work)).format(
        "H [hrs], m [mins], s [secs]"
      );
      message.channel.send(
        lang.ECONOMY.RECENTLY_WORKED.replace("{time}", timeUntilWork)
      );
    } else {
      const { name, amount } = jobs[Math.floor(Math.random() * jobs.length)];

      const embed = BaseEmbed(message)
        .setTitle("Work!")
        .setDescription(
          `${lang.ECONOMY.WORKED
            .replace("{member}", member.username)
            .replace("{job_name}", name)
            .replace("{amount}", amount)} 💰`
        );

      message.channel.send(embed);

      await updateUserById(member.id, message.guild.id, {
        money: user.money + amount,
        work: Date.now(),
      });
    }
  },
};
