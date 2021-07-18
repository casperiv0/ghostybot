import { time } from "@discordjs/builders";
import { Message } from "discord.js";
import Command from "structures/Command";
import jobs from "assets/json/jobs.json";
import Bot from "structures/Bot";

export default class WorkCommand extends Command {
  constructor(bot: Bot) {
    super(bot, {
      name: "work",
      description: "work",
      category: "economy",
    });
  }

  async execute(message: Message) {
    const lang = await this.bot.utils.getGuildLang(message.guild?.id);
    try {
      const member = message.author;
      const timeout = 3600000;

      const user = await this.bot.utils.getUserById(member.id, message.guild?.id);
      if (!user) {
        return message.channel.send({ content: lang.GLOBAL.ERROR });
      }

      const work = user.work;

      if (work !== null && timeout - (Date.now() - work) > 0) {
        const dateTime = new Date(Date.now() + timeout - (Date.now() - work));

        message.channel.send({
          content: `You have already worked recently. Check back ${time(dateTime, "R")}`,
        });
      } else {
        const { name, amount } = jobs[Math.floor(Math.random() * jobs.length)];

        const embed = this.bot.utils
          .baseEmbed(message)
          .setTitle(lang.ECONOMY.WORK)
          .setDescription(
            `${lang.ECONOMY.WORKED.replace("{member}", member.username)
              .replace("{job_name}", name)
              .replace("{amount}", `${amount}`)} 💰`,
          );

        await message.channel.send({ embeds: [embed] });

        await this.bot.utils.updateUserById(member.id, message.guild?.id, {
          money: user.money + amount,
          work: Date.now(),
        });
      }
    } catch (err) {
      this.bot.utils.sendErrorLog(err, "error");
      return message.channel.send({ content: lang.GLOBAL.ERROR });
    }
  }
}
