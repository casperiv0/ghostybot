const User = require("../models/User.model");
const Guild = require("../models/Guild.model");
const Warning = require("../models/Warning.model");
const Sticky = require("../models/Sticky.model");
const BaseEmbed = require("../modules/BaseEmbed");
const moment = require("moment");
const Logger = require("../modules/Logger");
// eslint-disable-next-line no-unused-vars
const { Message, Client } = require("discord.js");
const { errorLogsChannelId, dashboard } = require("../../config.json");
const jwt = require("jsonwebtoken");
const fetch = require("node-fetch");
const fs = require("fs");

/**
 *
 * @param {string} userId
 * @param {string} guildId
 * @returns {{
 * user: {
 * money: number;
 *  bank: number;
 *  work: number;
 *  xp: number;
 *  daily: number;
 *  weekly: number;
 *  user_id: string;
 *  guild_id: string;
 *  inventory: string[];
 * },
 * warnings: Array<{reason: string, guild_id: string;user_id: string;}>
 * }}
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

/**
 * Add a user to the database
 * @param {string} userId
 * @param {string} guildId
 */
async function addUser(userId, guildId) {
  try {
    const user = new User({ user_id: userId, guild_id: guildId });

    await user.save();

    return user;
  } catch (e) {
    console.error(e);
  }
}

/**
 * Updates user information
 * @param {string} userId Id of the user
 * @param {string} guildId Id of the guild
 * @param {object} data updated data object
 */
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

/**
 *
 * @param {string} userId
 * @param {string} guildId
 */
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

/**
 * @param {string} guildId
 */
async function addGuild(guildId) {
  try {
    const guild = new Guild({ guild_id: guildId });

    await guild.save();

    return guild;
  } catch (e) {
    console.error(e);
  }
}

/**
 * @param {string} guildId
 */
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
  return BaseEmbed(message)
    .setTitle("Woah!")
    .setDescription(
      `❌ I need ${permissions.map((p) => `\`${p}\``).join(", ")} permissions!`
    )
    .setColor("ORANGE");
};

/**
 * @param {Message} message
 * @param {string[]} args
 * @param {Boolean} allowAuthor
 */
function findMember(message, args, allowAuthor) {
  return message.guild.member(
    message.mentions.users.first() ||
      message.guild.members.cache.get(args[0]) ||
      message.guild.members.cache.find((m) => m.user.id === args[0]) ||
      message.guild.members.cache.find((m) => m.user.tag === args[0]) ||
      (allowAuthor === true ? message.member : null)
  );
}

/**
 * @param {string} guildId
 * @returns {Object} The found language
 */
async function getGuildLang(guildId) {
  try {
    const guild = await getGuildById(guildId);

    return require(`../locales/${guild?.locale || "english"}`);
  } catch (e) {
    console.error(e);
  }
}

/**
 * @param {Client} bot
 * @param {Message} message
 * @param {"warning" | "error"} type
 * @param {?string} msgContent
 */
function sendErrorLog(bot, error, type, msgContent) {
  if (!errorLogsChannelId) {
    Logger.error("UNHANDLED ERROR", error);
  }

  const message = {
    author: bot.user,
  };

  const name = error.name || "N/A";
  const code = error.code || "N/A";
  const httpStatus = error.httpStatus || "N/A";
  const stack = error.stack || "N/A";
  const content = msgContent || "N/A";

  const embed = BaseEmbed(message)
    .setTitle("An error occurred")
    .addField("Name", name, true)
    .addField("Code", code, true)
    .addField("httpStatus", httpStatus, true)
    .addField("Timestamp", Logger.fullDate(), true)
    .addField("Command executed", content, true)
    .setDescription(`\`\`\`${stack}\`\`\` `)
    .setColor(type === "error" ? "RED" : "ORANGE");

  bot.channels.cache.get(errorLogsChannelId)?.send(embed);
}

/**
 * @param {number | string} date
 * @returns {string}
 */
const formatDate = (date) => moment(date).format("MM/DD/YYYY");

/**
 * @param {string} str
 * @returns {string}
 */
const toCapitalize = (str) => str.charAt(0).toUpperCase() + str.slice(1);

/**
 * @param {number} xp
 * @returns {number} calculated level
 */
const calculateUserXp = (xp) => Math.floor(0.1 * Math.sqrt(xp));

function getLanguages() {
  return fs
    .readdirSync("./src/locales/")
    .filter((f) => f.endsWith(".js"))
    .map((la) => la.slice(0, -3));
}

async function createWebhook(bot, channelId, oldChannelId) {
  const channel = bot.channels.cache.get(channelId);
  if (!channel) return;

  if (oldChannelId) {
    const w = await channel.fetchWebhooks();
    w.find((w) => w.name === `audit-logs-${oldChannelId}`)?.delete();
  }

  await channel.createWebhook(`audit-logs-${channelId}`, {
    avatar: bot.user.displayAvatarURL({ format: "webp" }),
  });
}

async function getWebhook(guild) {
  const w = await guild.fetchWebhooks();
  const g = await getGuildById(guild.id);
  const webhook = w.find((w) => w.name === `audit-logs-${g.audit_channel}`);
  if (!webhook) return null;

  return webhook;
}

function parseMessage(message, user, msg) {
  const newMessage = message.split(" ").map((word) => {
    const { username, tag, id, discriminator } = user;
    let w = word;

    w = w
      .replace("{user}", user)
      .replace("{user.tag}", tag)
      .replace("{user.username}", username)
      .replace("{user.discriminator}", discriminator)
      .replace("{user.id}", id);

    if (msg) {
      w.replace("{guild.id}", msg.guild.id)
        .replace("{guild.name}", msg.guild.name)
        .replace("{message.author}", msg.author)
        .replace("{message.author.id}", msg.author.id)
        .replace("{message.author.tag}", msg.author.tag)
        .replace("{message.author.username}", msg.author.username);
    }

    return w;
  });

  return newMessage;
}

/* DASHBOARD FUNCTIONS */
/**
 *
 * @param {string} path
 * @param {{data: string; type: "Bot" | "Bearer"}} token
 * @param {*} method
 */
async function handleApiRequest(path, token, method) {
  try {
    const bearer =
      token.type === "Bearer"
        ? jwt.verify(token.data, dashboard.jwtSecret)
        : token.data;

    if (!bearer) {
      return { error: "invalid_token" };
    }

    const res = await fetch(`${dashboard.discordApiUrl}${path}`, {
      method,
      headers: {
        Authorization: `${token.type} ${bearer}`,
      },
      scope: "guilds",
    });
    return await res.json();
  } catch (e) {
    return { error: "invalid_token" };
  }
}

/* THANKS TO: https://github.com/discord/discord-api-docs/issues/1701#issuecomment-642143814 🎉 */
function encode(obj) {
  let string = "";

  for (const [key, value] of Object.entries(obj)) {
    if (!value) continue;
    string += `&${encodeURIComponent(key)}=${encodeURIComponent(value)}`;
  }

  return string.substring(1);
}

module.exports = {
  errorEmbed,
  sendErrorLog,
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
  getLanguages,
  handleApiRequest,
  parseMessage,
  createWebhook,
  encode,
  getWebhook,
};
