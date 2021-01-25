import { Message } from "discord.js";
import Command from "../../structures/Command";
import Bot from "../../structures/Bot";

export default class SayCommand extends Command {
  constructor(bot: Bot) {
    super(bot, {
      name: "say",
      description: "Let the bot say something",
      category: "admin",
      memberPermissions: ["MANAGE_MESSAGES"],
      requiredArgs: [{ name: "text | type(embed)" }],
    });
  }

  async execute(bot: Bot, message: Message, args: string[]) {
    const [type] = args;
    let msg = args.join(" ");

    message.deletable && message.delete();

    if (type === "embed") {
      msg = args.slice(1).join(" ");
      const embed = bot.utils.baseEmbed(message).setDescription(msg);
      return message.channel.send(embed);
    }

    message.channel.send(msg);
  }
}
