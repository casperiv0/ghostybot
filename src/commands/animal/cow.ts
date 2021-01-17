import cowsPack from "cows";
import { Message } from "discord.js";
import Command from "../../structures/Command";
import Bot from "../../structures/Bot";

export default class CowCommand extends Command {
  constructor(bot: Bot) {
    super(bot, {
      name: "cow",
      description: "Returns a cow ascii",
      category: "animal",
    });
  }

  async execute(bot: Bot, message: Message) {
    const lang = await bot.utils.getGuildLang(message.guild?.id);
    try {
      const cows = cowsPack();
  
      const cow = cows[Math.floor(Math.random() * cows.length)];
  
      const embed = bot.utils
        .baseEmbed(message)
        .setTitle(lang.ANIMAL.COW)
        .setDescription(`\`\`\`${cow}\`\`\``);
  
      message.channel.send(embed);
    } catch (err) {
      bot.utils.sendErrorLog(err, "error");
      return message.channel.send(lang.GLOBAL.ERROR);
    }
  }
}
