import { Message } from "discord.js";
import Command from "structures/Command";
import Bot from "structures/Bot";

export default class _8BallCommand extends Command {
  constructor(bot: Bot) {
    super(bot, {
      name: "8ball",
      description: "8Ball",
      category: "games",
      requiredArgs: [{ name: "text" }],
    });
  }

  async execute(message: Message, args: string[]) {
    const lang = await this.bot.utils.getGuildLang(message.guild?.id);
    const answers = lang.OTHER.ANSWERS;

    try {
      const question = args.join(" ");

      const answer = answers[Math.floor(Math.random() * answers.length)];

      const embed = this.bot.utils
        .baseEmbed(message)
        .setTitle("8Ball")
        .addField(`${lang.GAMES.QUESTION}:`, question)
        .addField(`${lang.GAMES.ANSWER}:`, answer);

      return message.channel.send({ embeds: [embed] });
    } catch (err) {
      this.bot.utils.sendErrorLog(err, "error");
      return message.channel.send(lang.GLOBAL.ERROR);
    }
  }
}
