import { Message } from "discord.js";
import categories from "../../data/categories.json";
import Command from "../../structures/Command";
import Bot from "../../structures/Bot";

export default class EnableCommand extends Command {
  constructor(bot: Bot) {
    super(bot, {
      name: "enable",
      description: "Enables a command",
      category: "exempt",
      memberPermissions: ["ADMINISTRATOR"],
      requiredArgs: [{ name: "command name | category name" }],
    });
  }

  async execute(bot: Bot, message: Message, args: string[]) {
    const lang = await bot.utils.getGuildLang(message.guild?.id);
    try {
      const [option] = args;
      const guild = await bot.utils.getGuildById(message.guild?.id);

      if (!guild) {
        return message.channel.send(lang.GLOBAL.ERROR);
      }

      if (!option) {
        return message.channel.send(lang.ADMIN.PROVIDE_COMMAND_OR_CATEGORY_NAME);
      }

      const command =
        bot.commands.get(option.toLowerCase()) || bot.commands.get(bot.aliases.get(option)!);

      if (!command) {
        // enable category
        const category = option.toLowerCase();
        if (!categories.includes(category)) {
          return message.channel.send(lang.ADMIN.COMMAND_OR_CATEGORY_NOT_FOUND);
        }

        if (!guild.disabled_categories.includes(category)) {
          return message.channel.send(lang.ADMIN.CATEGORY_NOT_DISABLED);
        }

        await bot.utils.updateGuildById(message.guild?.id, {
          disabled_categories: guild.disabled_categories.filter((c) => c !== category),
        });

        const embed = bot.utils
          .baseEmbed(message)
          .setTitle(lang.ADMIN.ENABLED_CATEGORY)
          .setDescription(lang.ADMIN.CATEGORY_ENABLED.replace("{category}", category));

        return message.channel.send(embed);
      } else {
        // enable command
        if (!command?.name) {
          return message.channel.send(lang.ADMIN.COMMAND_NOT_FOUND);
        }

        if (!guild.disabled_commands.includes(command.name)) {
          return message.channel.send(lang.ADMIN.COMMAND_NOT_DISABLED);
        }

        await bot.utils.updateGuildById(message.guild?.id, {
          disabled_commands: guild.disabled_commands.filter((c) => c !== command.name),
        });

        const embed = bot.utils
          .baseEmbed(message)
          .setTitle(lang.ADMIN.ENABLED_COMMAND)
          .setDescription(lang.ADMIN.COMMAND_ENABLED.replace("{commandName}", command.name));

        return message.channel.send(embed);
      }
    } catch (err) {
      bot.utils.sendErrorLog(err, "error");
      return message.channel.send(lang.GLOBAL.ERROR);
    }
  }
}
