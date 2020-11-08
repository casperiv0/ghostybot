const BaseEmbed = require("../../modules/BaseEmbed");
const { getUserById } = require("../../utils/functions");

module.exports = {
  name: "inventory",
  description: "View your or a user inventory",
  category: "economy",
  usage: "inventory <user>",
  aliases: ["inv"],
  async execute(bot, message, args) {
    const member = bot.findMember(message, args, true);
    const { user } = await getUserById(member.id, message.guild.id);
    const inventory = user?.inventory;

    if (!inventory || !inventory?.[0]) {
      return message.channel.send("User's inventory is empty");
    }

    const mapped = inventory?.map((item) => item).join(",\n ");

    const embed = BaseEmbed(message)
      .setTitle(`${member.username}'s Inventory`)
      .setDescription(`${mapped}`);

    message.channel.send({ embed });
  },
};
