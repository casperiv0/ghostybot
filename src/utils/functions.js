const User = require("../models/User.model");
const Guild = require("../models/Guild.model");
const Warning = require("../models/Warning.model");
const Sticky = require("../models/Sticky.model");
const BaseEmbed = require("../modules/BaseEmbed");
const moment = require("moment");
const Logger = require("../modules/Logger");
const { Util } = require("discord.js");
const { errorLogsChannelId, dashboard } = require("../../config.json");
const jwt = require("jsonwebtoken");
const fetch = require("node-fetch");
const fs = require("fs");

/* WARNINGS */
/**
 * @param {string} userId
 * @param {string} guildId
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

/**
 * @param {string} userId
 * @param {string} guildId
 */
async function removeUserWarnings(userId, guildId) {
  try {
    await Warning.deleteMany({ user_id: userId, guild_id: guildId });
  } catch (e) {
    console.error(e);
  }
}

/* STICKY DATA */
/**
 * @param {string} messageId
 * @param {string} channelId
 * @param {string} message
 */
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

/**
 * @param {string} channelId
 */
async function getSticky(channelId) {
  try {
    const sticky = await Sticky.findOne({ channel_id: channelId });

    return sticky;
  } catch (e) {
    console.error(e);
  }
}

/**
 * @param {string} channelId
 */
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
  return bot.utils
    .baseEmbed(message)
    .setTitle("Woah!")
    .setDescription(`❌ I need ${permissions.map((p) => `\`${p}\``).join(", ")} permissions!`)
    .setColor("ORANGE");
};

/**
 * @param {import("discord.js").Guild} guild
 */
async function findOrCreateMutedRole(guild) {
  const { muted_role_id } = await getGuildById(guild.id);
  return (
    guild.roles.cache.find((r) => r.id === muted_role_id) ||
    guild.roles.cache.find((r) => r.name === "muted") ||
    (await guild.roles.create({
      data: {
        name: "muted",
        color: "GRAY",
      },
      reason: "Mute a user",
    }))
  );
}

/**
 *
 * @param {import("discord.js").Guild} guild
 * @param {string} memberId
 * @param {import("discord.js").PermissionObject} perms
 */
function updateMuteChannelPerms(guild, memberId, perms) {
  guild.channels.cache.forEach((channel) => {
    channel.updateOverwrite(memberId, perms).catch((e) => {
      Logger.error("mute_user", e?.stack || e);
    });
  });
}

module.exports = {
  errorEmbed,
  formatDate,
  addWarning,
  removeUserWarnings,
  addSticky,
  getSticky,
  removeSticky,
  findOrCreateMutedRole,
  updateMuteChannelPerms,
};
