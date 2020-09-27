//* this file is for creating small mostly database related functions to keep stuff clean in the command files.
//! If you are contributing, please use this file for db functions!

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
 * @param {String} guildId
 * @param {String} userId
 * @param {Number} amount
 */
const removeUserBank = (guildId, userId, amount) =>
  db.subtract(`bank_${guildId}_${userId}`, amount);

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
 * @param {string} guildId
 * @param {string} userId
 */
const getUserInventory = (guildId, userId) =>
  db.fetch(`inventory_${guildId}_${userId}`);

/**
 * @param {string} guildId
 * @param {string} userId
 * @param {string} newItem
 */
const setUserInventory = (guildId, userId, newItem) =>
  db.push(`inventory_${guildId}_${userId}`, newItem);

/**
 * @param {string} guildId
 */
const getStoreItems = (guildId) => db.fetch(`store_${guildId}`);

/**
 * @param {string} guildId
 * @param {string} newItem
 */
const setStoreItems = (guildId, newItem) =>
  db.push(`store_${guildId}`, newItem);

/**
 * @param {string} guildId
 * @param {Array} updatedItems
 */
const removeStoreItem = (guildId, updatedItems) =>
  db.set(`store_${guildId}`, updatedItems);

/**
 * @param {string} data
 * @returns {string}
 */
const formatDate = (date) => moment(date).format("MM/DD/YYYY");

/**
 * @param {String} str
 * @returns {String}
 */
const toCapitalize = (str) => str.charAt(0).toUpperCase() + str.slice(1);

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
 * @param {string} guildId
 * @param {Object} channel
 */
const setLeaveChannel = (guildId, channel) =>
  db.set(`leavechannel_${guildId}`, channel);

/**
 * @param {string} guildId
 */
const getLeaveChannel = (guildId) => db.fetch(`leavechannel_${guildId}`);

/**
 * @param {string} guildId
 */
const unsetLeaveChannel = (guildId) => db.delete(`leavechannel_${guildId}`);
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

// xp
/**
 * @param {String} guildId
 * @param {String} userId
 * @param {Number} amount
 */
const setUserXp = (guildId, userId, amount) =>
  db.set(`xp_${guildId}_${userId}`, amount);

/**
 * @param {String} guildId
 * @param {String} userId
 * @param {Number} amount
 */
const addUserXp = (guildId, userId, amount) =>
  db.add(`xp_${guildId}_${userId}`, amount);

/**
 * @param {String} guildId
 * @param {String} userId
 */
const getUserXp = (guildId, userId) => db.fetch(`xp_${guildId}_${userId}`);

/**
 * @param {Number} min
 * @param {Number} max
 */
const generateXp = (min, max) => Math.ceil(Math.random() * (min * max));

// Audit logs
/**
 * @param {String} guildId
 * @param {Object} channel
 */
const setAuditChannel = (guildId, channel) =>
  db.set(`auditchannel_${guildId}`, channel);

/**
 * @param {String} guildId
 */
const getAuditChannel = (guildId) => db.fetch(`auditchannel_${guildId}`);

/**
 * @param {String} guildId
 */
const unsetAuditChannel = (guildId) => db.delete(`auditchannel_${guildId}`);
/**
 *
 * @param {String} guildId
 * @param {Object} channel
 */
const setModLog = (guildId, channel) => db.set(`modlog_${guildId}`, channel);
/**
 *
 * @param {String} guildId
 *
 */
const getModLog = (guildId) => db.fetch(`modlog_${guildId}`);
/**
 *
 * @param {String} guildId
 */
const unsetModLog = (guildId) => db.delete(`modlog_${guildId}`);
/**
 * @param {String} guildId
 * @param {Object} role
 */
const setWelcomeRole = (guildId, role) =>
  db.set(`welcomerole_${guildId}`, role);

/**
 * @param {String} guildId
 */
const getWelcomeRole = (guildId) => db.fetch(`welcomerole_${guildId}`);

/**
 * @param {String} guildId
 */
const unsetWelcomeRole = (guildId) => db.delete(`welcomerole_${guildId}`);

// Blacklist
/**
 * @param {Object} user
 */
const addBlacklistUser = (user) => db.push("blacklist", user);

const getBlacklistUsers = () => db.fetch("blacklist");

/**
 * @param {Array} users
 */
const setBlacklistUsers = (users) => db.set("blacklist", users);

/* warnings */
/**
 * @param {Sting} guildId
 * @param {Object} warnings
 */
const setWarningUsers = (guildId, warnings) =>
  db.set(`warnings_${guildId}`, warnings);

/**
 * @param {String} guildId
 * @param {Object} warning
 */
const addWarningUser = (guildId, warning) =>
  db.push(`warnings_${guildId}`, warning);

/**
 * @param {String} guildId
 */
const getWarningUsers = (guildId) => db.fetch(`warnings_${guildId}`);

module.exports = {
  getUserMoney,
  getUserBank,
  addUserMoney,
  addUserBank,
  removeUserBank,
  removeUserMoney,
  getUserDaily,
  setUserDaily,
  getUserWork,
  setUserWork,
  getUserInventory,
  setUserInventory,
  getStoreItems,
  setStoreItems,
  removeStoreItem,
  formatDate,
  toCapitalize,
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
  setLeaveChannel,
  getLeaveChannel,
  unsetLeaveChannel,
  errorEmbed,
  setUserXp,
  addUserXp,
  getUserXp,
  generateXp,
  setAuditChannel,
  getAuditChannel,
  unsetAuditChannel,
  setModLog,
  getModLog,
  unsetModLog,
  setWelcomeRole,
  getWelcomeRole,
  unsetWelcomeRole,
  addBlacklistUser,
  getBlacklistUsers,
  setBlacklistUsers,
  setWarningUsers,
  addWarningUser,
  getWarningUsers,
};
