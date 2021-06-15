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
      const [reply1, reply2] = data.questions;

      const embed = this.bot.utils
        .baseEmbed(message)
        .setTitle(data.title)
        .setDescription(
          `${reply1.question} **OR** ${reply2.question}\n\n\n${data.description || ""}`,
        )
        .addField("Votes", data.total_votes.toString(), true);

      if (data.author) {
        embed.addField(lang.UTIL.AUTHOR, data.author, true);
      }

      return message.channel.send({ embeds: [embed] });
    } catch (err) {
      this.bot.utils.sendErrorLog(err, "error");
      return message.channel.send({ content: lang.GLOBAL.ERROR });
    }
  }
}
