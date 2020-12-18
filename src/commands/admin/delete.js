module.exports = {
  name: "delete",
  description: "Delete message, up to 100",
  usage: "delete <1-100>",
  aliases: ["purge", "clear"],
  category: "admin",
  memberPermissions: ["MANAGE_MESSAGES"],
  botPermissions: ["MANAGE_MESSAGES"],
  requiredArgs: ["amount"],
  async execute(bot, message, args) {
    const [amount] = args;
    const lang = await bot.getGuildLang(message.guild.id);

    if (isNaN(amount) || amount > 100) {
      return message.channel.send(lang.ADMIN.DELETE_PROVIDE_AMOUNT);
    }

    try {
      await message.channel.bulkDelete(Number(amount)).then(() => {
        message.channel
          .send(lang.ADMIN.DELETE_DELETED.replace("{amount}", amount))
          .then((msg) => msg.delete({ timeout: 2000 }, true));
      });
    } catch {
      return message.channel.send(lang.ADMIN.DELETE_ERROR);
    }
  },
};
