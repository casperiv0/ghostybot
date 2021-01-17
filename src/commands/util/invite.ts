import { Message, TextChannel } from "discord.js";
import Command from "../../structures/Command";
import Bot from "../../structures/Bot";

export default class InviteCommand extends Command {
  constructor(bot: Bot) {
    super(bot, {
      name: "invite",
      description: "Creates an instant invite for the server",
      category: "util",
      botPermissions: ["CREATE_INSTANT_INVITE"],
      aliases: ["inv"],
    });
  }

  async execute(bot: Bot, message: Message) {
    const invite = await (message.channel as TextChannel).createInvite();

    return message.channel.send(`https://discord.gg/${invite.code}`);
  }
}
