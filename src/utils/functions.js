const User = require("../models/User.model");
const Guild = require("../models/Guild.model");
const Warning = require("../models/Warning.model");
const Sticky = require("../models/Sticky.model");
const BaseEmbed = require("../modules/BaseEmbed");
const moment = require("moment");

/**
 *
 * @param {string} userId
 * @param {string} guildId
 */
async function getUserById(userId, guildId) {
  try {
    let user = await User.findOne({ user_id: userId, guild_id: guildId });
    const warnings = await Warning.find({ user_id: userId, guild_id: guildId });

    if (!user) {
      user = await addUser(userId, guildId);
    }

    return {
      user,
      warnings: warnings,
    };
  } catch (e) {
    console.error(e);
  }
}

async function addUser(userId, guildId) {
  try {
    const user = new User({ user_id: userId, guild_id: guildId });

    await user.save();

    return user;
  } catch (e) {
    console.error(e);
  }
}

async function updateUserById(userId, guildId, data) {
  try {
    if (typeof data !== "object") {
      throw Error("'data' must be an object");
    }

    const user = await getUserById(userId, guildId);

    if (!user) {
      await addUser(guildId);
    }

    await User.findOneAndUpdate({ user_id: userId, guild_id: guildId }, data);
  } catch (e) {
    console.error(e);
  }
}

async function removeUser(userId, guildId) {
  try {
    await User.findOneAndDelete({ user_id: userId, guild_id: guildId });
  } catch (e) {
    console.error(e);
  }
}

/**
 * @param {string} guildId
 */
async function getGuildById(guildId) {
  try {
    let guild = await Guild.findOne({ guild_id: guildId });

    if (!guild) {
      guild = await addGuild(guildId);
    }

    return guild;
  } catch (e) {
    console.error(e);
  }
}

/**
 * @param {string} guildId
 * @param {object} settings
 */
async function updateGuildById(guildId, settings) {
  try {
    if (typeof settings !== "object") {
      throw Error("'settings' must be an object");
    }

    // check if guild exists
    const guild = await getGuildById(guildId);

    if (!guild) {
      await addGuild(guildId);
    }

    await Guild.findOneAndUpdate({ guild_id: guildId }, settings);
  } catch (e) {
    console.error(e);
  }
}

async function addGuild(guildId) {
  try {
    const guild = new Guild({ guild_id: guildId });

    await guild.save();

    return guild;
  } catch (e) {
    console.error(e);
  }
}

async function removeGuild(guildId) {
  try {
    await Guild.findOneAndDelete({ guild_id: guildId });
  } catch (e) {
    console.error(e);
  }
}

/* WARNINGS */
/**
 * @param {string} userId
 * @param {string} reason
 */
async function addWarning(userId, guildId, reason) {
  try {
    const warning = new Warning({ guild_id: guildId, user_id: userId, reason });

    await warning.save();
  } catch (e) {
    console.error(e);
  }
}

async function removeUserWarnings(userId, guildId) {
  try {
    await Warning.deleteMany({ user_id: userId, guild_id: guildId });
  } catch (e) {
    console.error(e);
  }
}

/* STICKY DATA */
async function addSticky(messageId, channelId, message) {
  try {
    const sticky = new Sticky({
      message_id: messageId,
      message,
      channel_id: channelId,
    });

    await sticky.save();
  } catch (e) {
    console.error(e);
  }
}

async function getSticky(channelId) {
  try {
    const sticky = await Sticky.findOne({ channel_id: channelId });

    return sticky;
  } catch (e) {
    console.error(e);
  }
}

async function removeSticky(channelId) {
  try {
    await Sticky.findOneAndDelete({ channel_id: channelId });
  } catch (e) {
    console.error(e);
  }
}

/**
 * @param {Array} permissions
 * @param {Object} message
 */
const errorEmbed = (permissions, message) => {
  return BaseEmbed(message)
    .setTitle("Woah!")
    .setDescription(
      `❌ I need ${permissions.map((p) => `\`${p}\``).join(", ")} permissions!`
    )
    .setColor("ORANGE");
};

function findMember(message, args, allowAuthor) {
  return message.guild.member(
    message.mentions.users.first() ||
      message.guild.members.cache.get(args[0]) ||
      message.guild.members.cache.find((m) => m.user.tag === args[0]) ||
      (allowAuthor === true ? message.member : null)
  );
}

async function getGuildLang(guildId) {
  try {
    const guild = await getGuildById(guildId);

    return require(`../locales/${guild?.locale || "english"}`);
  } catch (e) {
    console.error(e);
  }
}

const formatDate = (date) => moment(date).format("MM/DD/YYYY");

const toCapitalize = (str) => str.charAt(0).toUpperCase() + str.slice(1);

const calculateUserXp = (xp) => Math.floor(0.1 * Math.sqrt(xp));

module.exports = {
  errorEmbed,
  formatDate,
  toCapitalize,
  calculateUserXp,
  getUserById,
  addGuild,
  addUser,
  removeUser,
  updateUserById,
  getGuildById,
  updateGuildById,
  removeGuild,
  addWarning,
  removeUserWarnings,
  addSticky,
  getSticky,
  removeSticky,
  findMember,
  getGuildLang,
};
