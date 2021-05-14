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

  async execute(message: Message) {
    const lang = await this.bot.utils.getGuildLang(message.guild?.id);

    try {
      const reply = replies[Math.floor(Math.random() * replies.length)];

      const embed = this.bot.utils
        .baseEmbed(message)
        .setTitle(lang.GAMES.WYR)
        .setDescription(`**${reply}**`);

      message.channel.send(embed);
    } catch (err) {
      this.bot.utils.sendErrorLog(err, "error");
      return message.channel.send(lang.GLOBAL.ERROR);
    }
  }
}
