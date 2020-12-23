const { MessageEmbed } = require("discord.js");
const regions = require("../data/regions.json");

module.exports = {
  name: "guildRegionUpdate",
  /**
   * @param {import("discord.js").Client} bot
   * @param {import("discord.js").Guild} guild
   * @param {string} oldRegion
   * @param {string} newRegion
   */
  async execute(bot, guild, oldRegion, newRegion) {
    if (!guild.me.hasPermission("MANAGE_WEBHOOKS")) return;

    const webhook = await bot.getWebhook(guild);
    if (!webhook) return;

    const oldR = regions.find((r) => r.keys.includes(oldRegion.toLowerCase()));
    const newR = regions.find((r) => r.keys.includes(newRegion.toLowerCase()));

    const embed = new MessageEmbed()
      .setTimestamp()
      .setColor("ORANGE")
      .setTitle("Guild Update: `Region Update`")
      .setDescription("Region for this guild was updated")
      .addField("Old Region", `${oldRegion}: ${oldR.flag}`)
      .addField("New Region", `${newRegion}: ${newR.flag}`);

    webhook.send(embed);
  },
};
