import { Message } from "discord.js";
import Command from "../../structures/Command";
import Bot from "../../structures/Bot";

export default class InventoryCommand extends Command {
  constructor(bot: Bot) {
    super(bot, {
      name: "inventory",
      description: "View your or a user inventory",
      category: "economy",
      usage: "<user>",
    });
  }

  async execute(bot: Bot, message: Message, args: string[]) {
    const lang = await bot.utils.getGuildLang(message.guild?.id);
    try {
      const member = await bot.utils.findMember(message, args, true);
  
      if (member?.user?.bot) {
        return message.channel.send(lang.MEMBER.BOT_DATA);
      }
  
      if (!member) {
        return message.channel.send(lang.ADMIN.PROVIDE_VALID_MEMBER);
      }
  
      const user = await bot.utils.getUserById(member?.user?.id, message.guild?.id);
      const inventory = user?.inventory;
  
      if (!inventory || !inventory?.[0]) {
        return message.channel.send(lang.ECONOMY.INV_EMPTY);
      }
  
      const mapped = inventory?.map((item) => item).join(",\n ");
  
      const embed = bot.utils
        .baseEmbed(message)
        .setTitle(`${member.user.username} ${lang.ECONOMY.INVENTORY}`)
        .setDescription(`${mapped}`);
  
      message.channel.send({ embed });
    } catch (err) {
      bot.utils.sendErrorLog(err, "error");
      return message.channel.send(lang.GLOBAL.ERROR);
    }
  }
}
