const db = require("quick.db");
const moment = require("moment");
const { MessageEmbed } = require("discord.js");
const { ownerId } = require("../../config.json");

/**
 * @param {string} guildId
 * @param {string} userId
 * @returns {Promise}
 */
const getUserMoney = (guildId, userId) =>
  db.fetch(`money_${guildId}_${userId}`);

/**
 * @param {string} guildId
 * @param {string} userId
 * @returns {Promise}
 */
const getUserBank = (guildId, userId) => db.fetch(`bank_${guildId}_${userId}`);

/**
 * @param {string} guildId
 * @param {string} userId
 * @param {number} amount
 */
const addUserMoney = (guildId, userId, amount) =>
  db.add(`money_${guildId}_${userId}`, amount);

/**
 * @param {string} guildId
 * @param {string} userId
 * @param {number} amount
 */
const addUserBank = (guildId, userId, amount) =>
  db.add(`bank_${guildId}_${userId}`, amount);

/**
 * @param {string} guildId
 * @param {string} userId
 * @param {number} amount
 */
const removeUserMoney = (guildId, userId, amount) =>
  db.subtract(`money_${guildId}_${userId}`, amount);

/**
 * @param {string} guildId
 * @param {string} userId
 */
const getUserDaily = (guildId, userId) =>
  db.fetch(`daily_${guildId}_${userId}`);

/**
 * @param {string} guildId
 * @param {string} userId
 * @param {string} date
 */
const setUserDaily = (guildId, userId, date) =>
  db.set(`daily_${guildId}_${userId}`, date);

/**
 * @param {string} guildId
 * @param {string} userId
 */
const getUserWork = (guildId, userId) => db.fetch(`work_${guildId}_${userId}`);

/**
 * @param {string} guildId
 * @param {string} userId
 * @param {string} date
 */
const setUserWork = (guildId, userId, date) =>
  db.set(`work_${guildId}_${userId}`, date);

/**
 * @param {string} data
 * @returns {string}
 */
const formatDate = (date) => moment(date).format("MM/DD/YYYY");

/**
 * @param {string} guildId
 */
const getStickyData = (guildId) => db.fetch(`sticky_${guildId}`);

/**
 * @param {string} guildId
 * @param {Object} data
 */
const setStickyData = (guildId, data) => db.set(`sticky_${guildId}`, data);

/**
 * @param {string} guildId
 */
const getServerPrefix = (guildId) => db.fetch(`prefix_${guildId}`);

/**
 * @param {string} guildId
 * @param {string} newPrefix
 */
const setServerPrefix = (guildId, newPrefix) =>
  db.set(`prefix_${guildId}`, newPrefix);

const sendToDev = (message, bot, error) => {
  const errorEmbed = new MessageEmbed()
    .setTitle("Whoops! That wasn't supposed to happen!")
    .setDescription(`Send error to developer? y/n \n \`\`\` ${error} \`\`\` `)
    .setColor("RED")
    .setFooter(message.author.username)
    .setTimestamp();

  message.channel.send(errorEmbed);

  const filter = (m) => message.author.id === m.author.id;

  message.channel
    .awaitMessages(filter, { time: 600000, max: 1, errors: ["time"] })
    .then((messages) => {
      const msg = messages.first();
      if (msg.content === "y") {
        bot.users.cache.get(ownerId).send(
          `**New Error!** 
**Server ID:** ${message.guild.id}
**Error:** \`\`\`${error} \`\`\` `
        );
        msg.react("👍");
      } else {
        return console.log(error);
      }
    });
};

// Settings
/**
 * @param {string} guildId
 * @param {Object} channel
 */
const setSuggestChannel = (guildId, channel) =>
  db.set(`suggestchannel_${guildId}`, channel);

/**
 * @param {string} guildId
 */
const getSuggestChannel = (guildId) => db.fetch(`suggestchannel_${guildId}`);

/**
 * @param {string} guildId
 * @param {Object} channel
 */
const setAnnounceChannel = (guildId, channel) =>
  db.set(`announcechannel_${guildId}`, channel);

/**
 * @param guildId
 */
const getAnnounceChannel = (guildId) => db.fetch(`announcechannel_${guildId}`);

/**
 * @param {string} guildId
 */
const getWelcomeChannel = (guildId) => db.fetch(`welcomechannel_${guildId}`);

/**
 * @param {string} guildId
 * @param {Object} channel
 */
const setWelcomeChannel = (guildId, channel) =>
  db.set(`welcomechannel_${guildId}`, channel);

/**
 * @param {string} guildId
 */
const unsetWelcomeChannel = (guildId) => db.delete(`welcomechannel_${guildId}`);

/**
 * @param {string} error
 * @param {Object} message
 */
const errorEmbed = (error, message) => {
  return new MessageEmbed()
    .setTitle("Woah!")
    .setDescription(`❌ I don't have the correct permissions to ${error}`)
    .setColor("ORANGE")
    .setFooter(message.author.username)
    .setTimestamp();
};

module.exports = {
  getUserMoney,
  getUserBank,
  addUserMoney,
  addUserBank,
  removeUserMoney,
  getUserDaily,
  setUserDaily,
  getUserWork,
  setUserWork,
  formatDate,
  getStickyData,
  setStickyData,
  getServerPrefix,
  setServerPrefix,
  sendToDev,
  setSuggestChannel,
  getSuggestChannel,
  setAnnounceChannel,
  getAnnounceChannel,
  getWelcomeChannel,
  setWelcomeChannel,
  unsetWelcomeChannel,
  errorEmbed,
};
