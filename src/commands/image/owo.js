const fetch = require("node-fetch");
const BaseEmbed = require("../../modules/BaseEmbed");

module.exports = {
  name: "owo",
  description: "OwO",
  category: "image",
  async execute(bot, message) {
    const data = await fetch("https://rra.ram.moe/i/r?type=owo").then((res) =>
      res.json()
    );

    const embed = BaseEmbed(message)
      .setDescription(
        `[Click here if the image failed to load.](https://cdn.ram.moe/${data.path.replace(
          "/i/",
          ""
        )})`
      )
      .setImage(`https://cdn.ram.moe/${data.path.replace("/i/", "")}`);

    message.channel.send(embed);
  },
};
