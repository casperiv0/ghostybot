import { Message } from "discord.js";
import answers from "../../data/8ball.json";
import Command from "../../structures/Command";
import Bot from "../../structures/Bot";

export default class _8BallCommand extends Command {
  constructor(bot: Bot) {
    super(bot, {
      name: "8ball",
      description: "8Ball",
      category: "games",
      requiredArgs: ["text"],
    });
  }

  async execute(bot: Bot, message: Message, args: string[]) {
    const lang = await bot.utils.getGuildLang(message.guild?.id);
    const question = args.join(" ");

    const answer = answers[Math.floor(Math.random() * answers.length)];

    const embed = bot.utils
      .baseEmbed(message)
      .setTitle("8Ball")
      .addField(`${lang.GAMES.QUESTION}:`, question)
      .addField(`${lang.GAMES.ANSWER}:`, answer);

    message.channel.send(embed);
  }
}
