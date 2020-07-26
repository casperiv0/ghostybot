const db = require("quick.db");
const moment = require("moment");

/**
 * @param {string} guildId
 * @param {string} userId
 * @returns {Promise}
 */
const getUserMoney = (guildId, userId) => db.fetch(`money_${guildId}_${userId}`);

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
const addUserMoney = (guildId, userId, amount) => db.add(`money_${guildId}_${userId}`, amount);

/**
 * @param {string} guildId
 * @param {string} userId
 * @param {number} amount
 */
const addUserBank = (guildId, userId, amount) => db.add(`bank_${guildId}_${userId}`, amount);

/**
 * @param {string} guildId
 * @param {string} userId
 * @param {number} amount
 */
const removeUserMoney = (guildId, userId, amount) => db.subtract(`money_${guildId}_${userId}`, amount);

/**
 * @param {string} guildId
 * @param {string} userId
 */
const getUserDaily = (guildId, userId) => db.fetch(`daily_${guildId}_${userId}`);

/**
 * @param {string} guildId
 * @param {string} userId
 * @param {string} date
 */
const setUserDaily = (guildId, userId, date) => db.set(`daily_${guildId}_${userId}`, date);

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
const setUserWork = (guildId, userId, date) => db.set(`work_${guildId}_${userId}`, date);


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
const setServerPrefix = (guildId, newPrefix) => db.set(`prefix_${guildId}`, newPrefix);

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
    setServerPrefix
};