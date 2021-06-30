import Command from "structures/Command";
import Bot from "structures/Bot";
import { Message, Permissions } from "discord.js";

export default class ResetXpCommand extends Command {
  constructor(bot: Bot) {
    super(bot, {
      name: "resetxp",
      description: "reset all users xp for current server",
      category: "levels",
      memberPermissions: [Permissions.FLAGS.MANAGE_GUILD],
    });
  }

  async execute(message: Message) {
    if (!message.guild) return;
    const lang = await this.bot.utils.getGuildLang(message.guild?.id);
    try {
      const filter = (m: Message) => message.author.id === m.author.id;

      message.channel.send({
        content: lang.LEVELS.RESET_CONF,
      });

      message.channel
        .awaitMessages({
          filter,
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
              await this.bot.utils.updateUserById(user.id, message.guild?.id, {
                xp: 0,
              });
            });

            return message.channel.send({
              content: lang.LEVELS.RESET_SUCCESS,
            });
          }

          return message.channel.send({
            content: lang.LEVELS.RESET_CANCEL,
          });
        })
        .catch((e) => {
          this.bot.logger.error("resetxp", e?.stack || e);
          message.channel.send({ content: lang.GLOBAL.ERROR });
        });
    } catch (err) {
      this.bot.utils.sendErrorLog(err, "error");
      return message.channel.send({ content: lang.GLOBAL.ERROR });
    }
  }
}
