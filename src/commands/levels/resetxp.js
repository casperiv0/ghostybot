const Logger = require("../../modules/Logger");
const { updateUserById } = require("../../utils/functions");

module.exports = {
  name: "resetxp",
  description: "reset all users xp for current server",
  category: "levels",
  usage: "resetxp all",
  memberPermissions: ["MANAGE_GUILD"],
  async execute(bot, message) {
    const lang = await bot.getGuildLang(message.guild.id);
    const filter = (m) => message.author.id === m.author.id;

    message.channel.send(lang.LEVELS.RESET_CONF);

    message.channel
      .awaitMessages(filter, {
        time: 600000,
        max: 1,
        errors: ["time"],
      })
      .then(async (msgs) => {
        const msg = msgs.first();
        if (["y", "yes"].includes(msg.content.toLowerCase())) {
          const users = await message.guild.members.fetch();

          users.forEach(async (user) => {
            await updateUserById(user.id, message.guild.id, {
              xp: 0,
            });
          });

          message.channel.send(lang.LEVELS.RESET_SUCCESS);
        } else {
          message.channel.send(lang.LEVELS.RESET_CANCEL);
        }
      })
      .catch((e) => {
        Logger.error("resetxp", e?.stack || e);
        message.channel.send("An error occurred");
      });
  },
};
