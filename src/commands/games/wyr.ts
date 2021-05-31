import fetch from "node-fetch";
import { Message } from "discord.js";
import Command from "structures/Command";
import Bot from "structures/Bot";

export default class WouldYouRatherCommand extends Command {
  constructor(bot: Bot) {
    super(bot, {
      name: "wyr",
      description: "Would you rather ...",
      category: "games",
      typing: true,
    });
  }

  async execute(message: Message) {
    const lang = await this.bot.utils.getGuildLang(message.guild?.id);

    try {
      const data = await fetch("http://api.xaliks.xyz/random/wyr").then((res) => res.json());
      const [reply1, reply2] = data.data.questions;

      const embed = this.bot.utils
        .baseEmbed(message)
        .setTitle(lang.GAMES.WYR)
        .setDescription(`${reply1} **OR** ${reply2}`)
        .addField("Votes", data.data.votes, true)
        .addField("Author", data.data.author, true);

      return message.channel.send(embed);
    } catch (err) {
      this.bot.utils.sendErrorLog(err, "error");
      return message.channel.send(lang.GLOBAL.ERROR);
    }
  }
}
