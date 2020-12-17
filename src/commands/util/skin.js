const BaseEmbed = require("../../modules/BaseEmbed");
const fetch = require('node-fetch');

module.exports = {
  name: "skin",
  description: "Search for skins from Minecraft",
  category: "util",
  aliases: ["minecraftskin"],
  requiredArgs: ["username"],
  async execute(bot, message, args) {
    const lang = await bot.getGuildLang(message.guild.id);
    const search = args[0]

    if(!search) {
      return message.channel.send(lang.UTIL.PROVIDE_SKIN);
    }

    const uuuid = await fetch(`https://playerdb.co/api/player/minecraft/${encodeURIComponent(
      search
    )}`).then(res => res.json());
    if(!uuuid.success || uuuid?.error) return message.channel.send(
      lang.UTIL.SKIN_NOT_FOUND.replace("{search}", search)
    );
    const uuid = uuuid.data.player;
    const full = `https://visage.surgeplay.com/full/2048/${uuid.id}.png`;
    const skin = `https://visage.surgeplay.com/skin/2048/${uuid.id}.png`;
    const face = `https://visage.surgeplay.com/face/2048/${uuid.id}.png`;
    message.channel.send(
      BaseEmbed(message)
      .setAuthor(lang.UTIL.SKIN_NAME.replace("{name}", uuid.username), face)
      .setDescription(`${lang.UTIL.DOWNLOAD_SKIN}(${skin})`)
      .setImage(full)
    );
  },
};
