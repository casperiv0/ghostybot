import { Message, Permissions } from "discord.js";
import UserModel, { IUser } from "models/User.model";
import Command from "structures/Command";
import Bot from "structures/Bot";

export default class ResetEconomyCommand extends Command {
  constructor(bot: Bot) {
    super(bot, {
      name: "reseteconomy",
      description: "Reset all money/bank in this guild",
      category: "economy",
      memberPermissions: [Permissions.FLAGS.MANAGE_GUILD],
      aliases: ["reset-economy"],
    });
  }

  async execute(message: Message) {
    const lang = await this.bot.utils.getGuildLang(message.guild?.id);
    try {
      const filter = (m: Message) => message.author.id === m.author.id;

      message.channel.send({ content: lang.ECONOMY.RESET_CONF });

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
            const users: IUser[] = await UserModel.find({ guild_id: message.guild?.id });

            users.forEach(async (user) => {
              await this.bot.utils.updateUserById(user.user_id, message.guild?.id, {
                money: 0,
                bank: 0,
              });
            });

            return message.channel.send({ content: lang.ECONOMY.RESET_SUCCESS });
          }

          return message.channel.send({ content: lang.ECONOMY.RESET_CANCEL });
        })
        .catch((e) => {
          this.bot.logger.error("reset-economy", e?.stack || e);
          message.channel.send({ content: lang.GLOBAL.ERROR });
        });
    } catch (err) {
      this.bot.utils.sendErrorLog(err, "error");
      return message.channel.send({ content: lang.GLOBAL.ERROR });
    }
  }
}
