import { Message } from "discord.js";
import Command from "../../structures/Command";
import Bot from "../../structures/Bot";

export default class ResetEconomyCommand extends Command {
  constructor(bot: Bot) {
    super(bot, {
      name: "reseteconomy",
      description: "Reset all money/bank in this guild",
      category: "economy",
      memberPermissions: ["MANAGE_GUILD"],
      aliases: ["reset-economy"],
    });
  }

  async execute(bot: Bot, message: Message) {
    const lang = await bot.utils.getGuildLang(message.guild?.id);
    try {
      const filter = (m: Message) => message.author.id === m.author.id;
  
      message.channel.send(lang.ECONOMY.RESET_CONF);
  
      message.channel
        .awaitMessages(filter, {
          time: 600000,
          max: 1,
          errors: ["time"],
        })
        .then(async (msgs) => {
          const msg = msgs.first();
          if (!msg) return;
          if (["y", "yes"].includes(msg.content.toLowerCase())) {
            const users = await message.guild?.members.fetch();
  
            users?.forEach(async (user) => {
              await bot.utils.updateUserById(user.id, message.guild?.id, {
                money: 0,
                bank: 0,
              });
            });
  
            message.channel.send(lang.ECONOMY.RESET_SUCCESS);
          } else {
            message.channel.send(lang.ECONOMY.RESET_CANCEL);
          }
        })
        .catch((e) => {
          bot.logger.error("reset-economy", e?.stack || e);
          message.channel.send("An error occurred");
        });
    } catch (err) {
      bot.utils.sendErrorLog(err, "error");
      return message.channel.send(lang.GLOBAL.ERROR);
    }
  }
}
