import Command from "../../structures/Command";
import Bot from "../../structures/Bot";
import { Message } from "discord.js";

export default class ResetXpCommand extends Command {
  constructor(bot: Bot) {
    super(bot, {
      name: "resetxp",
      description: "reset all users xp for current server",
      category: "levels",
      memberPermissions: ["MANAGE_GUILD"],
    });
  }

  async execute(bot: Bot, message: Message) {
    if (!message.guild) return;
    const lang = await bot.utils.getGuildLang(message.guild?.id);
    try {
      const filter = (m: Message) => message.author.id === m.author.id;

      message.channel.send(lang.LEVELS.RESET_CONF);

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
                xp: 0,
              });
            });

            message.channel.send(lang.LEVELS.RESET_SUCCESS);
          } else {
            message.channel.send(lang.LEVELS.RESET_CANCEL);
          }
        })
        .catch((e) => {
          bot.logger.error("resetxp", e?.stack || e);
          message.channel.send(lang.GLOBAL.ERROR);
        });
    } catch (err) {
      bot.utils.sendErrorLog(err, "error");
      return message.channel.send(lang.GLOBAL.ERROR);
    }
  }
}
