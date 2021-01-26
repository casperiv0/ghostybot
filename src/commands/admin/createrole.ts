import { Message } from "discord.js";
import Command from "../../structures/Command";
import Bot from "../../structures/Bot";

export default class CreateRoleCommand extends Command {
  constructor(bot: Bot) {
    super(bot, {
      name: "createrole",
      description: "This command creates a role with the name of what you say",
      category: "admin",
      usage: "<role_name>",
      botPermissions: ["MANAGE_ROLES"],
      memberPermissions: ["MANAGE_ROLES"],
      requiredArgs: [{ name: "role name" }],
    });
  }

  async execute(bot: Bot, message: Message, args: string[]) {
    const lang = await bot.utils.getGuildLang(message.guild?.id);
    try {
      const [roleName] = args;

      message.guild?.roles.create({
        name: roleName,
        color: "BLUE",
      });

      const embed = bot.utils
        .baseEmbed(message)
        .setTitle(`${lang.ADMIN.CREATED_ROLE_CREATED}: ${roleName}`)
        .setDescription(lang.ADMIN.CREATED_ROLE_ADDED);

      message.channel.send(embed);
    } catch (err) {
      bot.utils.sendErrorLog(err, "error");
      return message.channel.send(lang.GLOBAL.ERROR);
    }
  }
}
