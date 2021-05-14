import cowsPack from "cows";
import { Message } from "discord.js";
import Command from "structures/Command";
import Bot from "structures/Bot";

export default class CowCommand extends Command {
  constructor(bot: Bot) {
    super(bot, {
      name: "cow",
      description: "Returns a cow ascii",
      category: "animal",
    });
  }

  async execute(message: Message) {
    const lang = await this.bot.utils.getGuildLang(message.guild?.id);
    try {
      const cows = cowsPack();

      const cow = cows[Math.floor(Math.random() * cows.length)];

      const embed = this.bot.utils
        .baseEmbed(message)
        .setTitle(lang.ANIMAL.COW)
        .setDescription(`\`\`\`${cow}\`\`\``);

      message.channel.send(embed);
    } catch (err) {
      this.bot.utils.sendErrorLog(err, "error");
      return message.channel.send(lang.GLOBAL.ERROR);
    }
  }
}
