import { GuildMember, Message } from "discord.js";
import Command from "../../structures/Command";
import Bot from "../../structures/Bot";
import BlacklistedModel from "../../models/Blacklisted.model";
import { UserData } from "../../models/User.model";

export default class BlacklistCommand extends Command {
  constructor(bot: Bot) {
    super(bot, {
      name: "blacklist",
      description: "Remove/add blacklist from a user",
      category: "botowner",
      usage: "<option> <level> <user>",
      options: ["add", "remove", "view"],
      ownerOnly: true,
    });
  }

  async execute(bot: Bot, message: Message, args: string[]) {
    const lang = await bot.utils.getGuildLang(message.guild?.id);

    try {
      const type = args[0];
      const member:
        | { user: { username: string; id: string; tag: string } }
        | GuildMember
        | null
        | undefined = (await bot.utils.findMember(message, args)) || {
        user: {
          username: "N/A",
          id: args[1],
          tag: "N/A",
        },
      };
  
      if (!type) {
        return message.channel.send(lang.BOT_OWNER.PROVIDE_TYPE);
      }
  
      if (member?.user?.id === bot.user?.id) {
        return message.channel.send(lang.BOT_OWNER.CANNOT_BL_BOT);
      }
  
      if (bot.config.owners.includes(member?.user?.id)) {
        return message.channel.send(lang.BOT_OWNER.CANNOT_BL_OWNER);
      }
  
      const users = await BlacklistedModel.find();
  
      switch (type) {
        case "view": {
          const usr = users.find((u: UserData) => u.user_id === member?.user?.id);
  
          if (!usr) {
            return message.channel.send(lang.BOT_OWNER.NOT_BLD);
          }
  
          const embed = bot.utils
            .baseEmbed(message)
            .setTitle(`${lang.BOT_OWNER.BLD_STATUS}: ${member?.user?.username}`)
            .addField(`${lang.LEVELS.LEVEL}`, "2");
  
          return message.channel.send({ embed });
        }
        case "add": {
          const existing = users.filter((u: UserData) => u.user_id === member?.user?.id)[0];
          if (existing) {
            return message.channel.send(
              lang.BOT_OWNER.ALREADY_BLD.replace("{member}", member?.user?.tag)
            );
          }
  
          const blUser = new BlacklistedModel({ user_id: member?.user?.id });
  
          await blUser.save();
          break;
        }
        case "remove": {
          if (users === null) {
            return message.channel.send(lang.BOT_OWNER.NOT_BLD);
          }
          const exists = users.find((u: UserData) => u.user_id === member?.user?.id);
          if (!exists) {
            return message.channel.send(lang.BOT_OWNER.NOT_BLD);
          }
  
          await BlacklistedModel.findOneAndDelete({ user_id: member?.user?.id });
          break;
        }
        default: {
          return message.channel.send(lang.BOT_OWNER.NOT_OPTION.replace("{type}", type));
        }
      }
      return message.channel.send(
        lang.BOT_OWNER.BLACKLISTED_SUCCESS.replace("{member}", member?.user?.tag).replace(
          "{type}",
          type === "add" ? lang.BOT_OWNER.BLACKLISTED : lang.BOT_OWNER.UNBLACKLISTED
        )
      );
    } catch (err) {
      bot.utils.sendErrorLog(err, "error");
      return message.channel.send(lang.GLOBAL.ERROR);
    }
  }
}
