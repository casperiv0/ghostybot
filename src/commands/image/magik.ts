import { Message } from "discord.js";
import fetch from "node-fetch";
import Command from "../../structures/Command";
import Bot from "../../structures/Bot";

export default class MagikCommand extends Command {
  constructor(bot: Bot) {
    super(bot, {
      name: "magik",
      description: "Just Magik",
      category: "image",
    });
  }

  async execute(message: Message, args: string[]) {
    const lang = await this.bot.utils.getGuildLang(message.guild?.id);
    try {
      const member = await this.bot.utils.findMember(message, args, { allowAuthor: true });

      let intensity = args[1] || Math.floor(Math.random() * 10);
      if (member?.user?.id === message.author.id) {
        intensity = args[0] || Math.floor(Math.random() * 10);
      }

      const data = await fetch(
        `https://nekothis.bot.xyz/api/imagegen?type=magik&intensity=${intensity}&image=${member?.user?.displayAvatarURL(
          {
            format: "png",
          },
        )}`,
      ).then((res) => res.json());

      message.channel.send(data.message);
    } catch (err) {
      this.bot.utils.sendErrorLog(err, "error");
      return message.channel.send(lang.GLOBAL.ERROR);
    }
  }
}
