import { Message } from "discord.js";
import fetch from "node-fetch";
import Command from "../../structures/Command";
import Bot from "../../structures/Bot";

export default class SkinCommand extends Command {
  constructor(bot: Bot) {
    super(bot, {
      name: "skin",
      description: "Search for skins from Minecraft",
      category: "util",
      aliases: ["minecraftskin"],
      requiredArgs: [{ name: "username" }],
    });
  }

  async execute(bot: Bot, message: Message, args: string[]) {
    const lang = await bot.utils.getGuildLang(message.guild?.id);

    try {
      const search = args[0];

      const uuid = await fetch(
        `https://playerdb.co/api/player/minecraft/${encodeURIComponent(search)}`
      ).then((res) => res.json());

      if (!uuid.success || uuid?.error) {
        return message.channel.send(lang.UTIL.SKIN_NOT_FOUND.replace("{search}", search));
      }

      const player = uuid.data.player;
      const full = `https://visage.surgeplay.com/full/2048/${uuid.id}.png`;
      const skin = `https://visage.surgeplay.com/skin/2048/${uuid.id}.png`;
      const face = `https://visage.surgeplay.com/face/2048/${uuid.id}.png`;

      message.channel.send(
        bot.utils
          .baseEmbed(message)
          .setAuthor(lang.UTIL.SKIN_NAME.replace("{name}", player.username), face)
          .setDescription(`${lang.UTIL.DOWNLOAD_SKIN}(${skin})`)
          .setImage(full)
      );
    } catch (err) {
      bot.utils.sendErrorLog(err, "error");
      return message.channel.send(lang.GLOBAL.ERROR);
    }
  }
}
