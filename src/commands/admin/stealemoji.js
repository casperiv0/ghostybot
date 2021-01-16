const { Util } = require("discord.js");
const { parse } = require("twemoji-parser");
const BaseEmbed = require("../../modules/BaseEmbed");

module.exports = {
  name: "stealemoji",
  category: "admin",
  usage: "<emoji> [custom name]",
  description: "Steal an emoji from a different server",
  requiredArgs: ["emoji"],
  botPermissions: ["MANAGE_EMOJIS"],
  memberPermissions: ["MANAGE_EMOJIS"],
  async execute(bot, message, args) {
    const lang = await bot.utils.getGuildLang(message.guild?.id);
    const emoji = args[0];
    const name = args.slice(1).join(" ");

    try {
      if (emoji.startsWith("https://cdn.discordapp.com")) {
        await message.guild.emojis.create(emoji, name || lang.ADMIN.GIVE_NAME);

        const embed = bot.utils.baseEmbed(message)
          .setTitle(lang.ADMIN.EMOJI_ADDED)
          .setDescription(`${lang.ADMIN.EMOJI_ADDED_NAME} ${name || lang.ADMIN.GIVE_NAME}`);
        return message.channel.send(embed);
      }

      const customEmoji = Util.parseEmoji(emoji);

      if (customEmoji.id) {
        const link = `https://cdn.discordapp.com/emojis/${customEmoji.id}.${
          customEmoji.animated ? "gif" : "png"
        }`;

        await message.guild.emojis.create(`${link}`, `${name || `${customEmoji.name}`}`);
        const embed = bot.utils.baseEmbed(message)
          .setTitle(lang.ADMIN.EMOJI_ADDED)
          .setDescription(
            `${lang.ADMIN.EMOJI_ADDED_NAME} ${name || customEmoji.name} | ${lang.ADMIN.PREVIEW} [${lang.HELP.CLICK_ME}](${link})`
          );
        return message.channel.send(embed);
      } else {
        const foundEmoji = parse(emoji, { assetType: "png" });
        if (!foundEmoji[0]) {
          return message.channel.send(lang.ADMIN.PROVIDE_VALID_EMOJI);
        }

        message.channel.send(lang.ADMIN.USE_NORMAL_EMOJI);
      }
    } catch (e) {
      if (String(e).includes("DiscordAPIError: Maximum number of emojis reached")) {
        return message.channel.send(lang.ADMIN.MAX_EMOJI);
      } else {
        return message.channel.send(lang.GLOBAL.ERROR);
      }
    }
  },
};
