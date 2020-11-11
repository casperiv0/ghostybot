const { owners } = require("../../../config.json");
const Blacklisted = require("../../models/Blacklisted.model");
const BaseEmbed = require("../../modules/BaseEmbed");

module.exports = {
  name: "blacklist",
  description: "Remove/add blacklist from a user",
  category: "botowner",
  usage: "blacklist <option> <level> <user>",
  options: ["add", "remove", "view"],
  ownerOnly: true,
  async execute(bot, message, args) {
    const lang = await bot.getGuildLang(message.guild.id);
    const type = args[0];
    const member =
      message.mentions.users.first() ||
      bot.users.cache.find((user) => user.id === args[1]);

    if (!type) {
      return message.channel.send(lang.BOT_OWNER.PROVIDE_TYPE);
    }

    if (!member) {
      return message.channel.send(lang.MEMBER.PROVIDE_MEMBER);
    }

    if (member.id === bot.user.id) {
      return message.channel.send(lang.BOT_OWNER.CANNOT_BL_BOT);
    }

    if (owners.includes(member.id)) {
      return message.channel.send(lang.BOT_OWNER.CANNOT_BL_OWNER);
    }

    const users = await Blacklisted.find();

    switch (type) {
      case "view": {
        const usr = users.find((u) => u.user_id === member.id);

        if (!usr) {
          return message.channel.send(lang.BOT_OWNER.NOT_BLD);
        }

        const embed = BaseEmbed(message)
          .setTitle(`${lang.BOT_OWNER.BLD_STATUS}: ${member.username}`)
          .addField(`${lang.LEVELS.LEVEL}`, "2");

        return message.channel.send({ embed });
      }
      case "add": {
        const existing = users.filter((u) => u.user_id === member.id)[0];
        if (existing) {
          return message.channel.send(
            lang.BOT_OWNER.ALREADY_BLD.replace("{member}", member.tag)
          );
        }

        const blUser = new Blacklisted({ user_id: member.id });

        await blUser.save();
        break;
      }
      case "remove": {
        if (users === null) {
          return message.channel.send(lang.BOT_OWNER.NOT_BLD);
        }
        const exists = users.find((u) => u.user_id === member.id);
        if (!exists) {
          return message.channel.send(lang.BOT_OWNER.NOT_BLD);
        }

        await Blacklisted.findOneAndDelete({ user_id: member.id });
        break;
      }
      default: {
        return message.channel.send(
          lang.BOT_OWNER.NOT_OPTION.replace("{type}", type)
        );
      }
    }
    return message.channel.send(
      lang.BOT_OWNER.BLACKLISTED_SUCCESS.replace(
        "{member}",
        member.tag
      ).replace(
        "{type}",
        type === "add"
          ? lang.BOT_OWNER.BLACKLISTED
          : lang.BOT_OWNER.UNBLACKLISTED
      )
    );
  },
};
