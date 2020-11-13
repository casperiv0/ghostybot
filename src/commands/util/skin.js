const MojangAPI = require("mojang-api");
const BaseEmbed = require("../../modules/BaseEmbed");
const Logger = require("../../modules/Logger");

module.exports = {
  name: "skin",
  description: "Search for skins from Minecraft",
  category: "info",
  aliases: ["minecraftskin"],
  async execute(bot, message, args) {
    const lang = await bot.getGuildLang(message.guild.id);
    const search = args.join(" ");

    if (!search) {
      return message.channel.send(lang.UTIL.PROVIDE_SKIN);
    }

    function Latin(str) {
      return /[a-z]/i.test(str);
    }

    function isNumber(str) {
      return /[0-9]/i.test(str);
    }

    if (!Latin(args) && !isNumber(args)) {
      return message.channel.send(
        lang.UTIL.SKIN_NOT_FOUND.replace("{search}", search)
      );
    }

    MojangAPI.nameToUuid(search, (err, res) => {
      if (err) {
        Logger.error("SKIN", err);
      } else {
        const uuid = res[0]?.id;
        if (!uuid) {
          return message.channel.send(
            lang.UTIL.SKIN_NOT_FOUND.replace("{search}", search)
          );
        }
        const full = `https://visage.surgeplay.com/full/2048/${uuid}.png`;
        const skin = `https://visage.surgeplay.com/skin/2048/${uuid}.png`;
        const face = `https://visage.surgeplay.com/face/2048/${uuid}.png`;
        message.channel.send(
          BaseEmbed(message)
            .setAuthor(lang.UTIL.SKIN_NAME.replace("{name}", res[0].name), face)
            .setDescription(`${lang.UTIL.DOWNLOAD_SKIN}(${skin})`)
            .setImage(full)
        );
      }
    });
  },
};
