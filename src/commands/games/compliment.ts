import { Message } from "discord.js";
import fetch from "node-fetch";
import Command from "../../structures/Command";
import Bot from "../../structures/Bot";

export default class ComplimentCommand extends Command {
  constructor(bot: Bot) {
    super(bot, {
      name: "compliment",
      description: "Get a compliment",
      category: "games",
    });
  }

  async execute(bot: Bot, message: Message) {
    const lang = await bot.utils.getGuildLang(message.guild?.id);

    const { compliment } = await fetch("https://complimentr.com/api").then((res) => res.json());

    const embed = bot.utils
      .baseEmbed(message)
      .setTitle(lang.GAMES.COMPLIMENT)
      .setDescription(compliment);

    message.channel.send(embed);
  }
}
