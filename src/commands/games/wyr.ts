import { Message } from "discord.js";
import Command from "../../structures/Command";
import Bot from "../../structures/Bot";
import replies from "../../data/wouldYouRather.json";

export default class WouldYouRatherCommand extends Command {
  constructor(bot: Bot) {
    super(bot, {
      name: "wyr",
      description: "Would you rather",
      category: "games",
    });
  }

  async execute(bot: Bot, message: Message) {
    const lang = await bot.utils.getGuildLang(message.guild?.id);

    const reply = replies[Math.floor(Math.random() * replies.length)];

    const embed = bot.utils
      .baseEmbed(message)
      .setTitle(lang.GAMES.WYR)
      .setDescription(`**${reply}**`);

    message.channel.send(embed);
  }
}
