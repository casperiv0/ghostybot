import { Message } from "discord.js";
import fetch from "node-fetch";
import Command from "structures/Command";
import Bot from "structures/Bot";

export default class PokeCommand extends Command {
  constructor(bot: Bot) {
    super(bot, {
      name: "poke",
      description: "Poke somebody",
      category: "image",
    });
  }

  async execute(message: Message) {
    const lang = await this.bot.utils.getGuildLang(message.guild?.id);

    try {
      const data = await fetch("https://nekos.life/api/v2/img/poke").then((res) => res.json());
      const user = message.mentions.users.first() || message.author;
      const poked = message.author.id === user.id ? "themselves" : user.username;

      const embed = this.bot.utils
        .baseEmbed(message)
        .setTitle(`${message.author.username} ${lang.IMAGE.POKED} ${poked}`)
        .setDescription(`${lang.IMAGE.CLICK_TO_VIEW}(${data.url})`)
        .setImage(`${data.url}`);

      return message.channel.send({ embeds: [embed] });
    } catch (err) {
      this.bot.utils.sendErrorLog(err, "error");
      return message.channel.send(lang.GLOBAL.ERROR);
    }
  }
}
