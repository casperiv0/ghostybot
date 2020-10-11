const { MessageEmbed } = require("discord.js");
const MojangAPI = require("mojang-api");

module.exports = {
  name: "skin",
  description: "Search for skins from Minecraft",
  category: "info",
  aliases: ["minecraftskin"],
  async execute(bot, message, args) {
    const search = args.join(" ");

    if (!search) {
      return message.channel.send("Please write the name of the skin");
    }

    MojangAPI.nameToUuid(search, (err, res) => {
      if (err) {
        console.log(err);
      } else {
        const uuid = res[0]?.id;
        if (!uuid)
          return message.channel.send(`Player \`${search}\` not found!`);
        const full = `https://visage.surgeplay.com/full/2048/${uuid}.png`;
        const skin = `https://visage.surgeplay.com/skin/2048/${uuid}.png`;
        const face = `https://visage.surgeplay.com/face/2048/${uuid}.png`;
        message.channel.send(
          new MessageEmbed()
            .setAuthor(`Player skin ${res[0].name}`, face)
            .setDescription(`[Download skin](${skin})`)
            .setImage(full)
            .setColor("BLUE")
        );
      }
    });
  },
};
