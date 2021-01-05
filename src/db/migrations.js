require("dotenv/config");
const { connect } = require("mongoose");
const GuildModel = require("../models/Guild.model");

function isDisabled(value) {
  return value === "Disabled" || !value;
}

(async function database() {
  const uri = process.env["MONGO_DB_URI"];

  try {
    await connect(uri, {
      useCreateIndex: true,
      useFindAndModify: false,
      useNewUrlParser: true,
      useUnifiedTopology: true,
    });
  } catch (e) {
    console.error(e);
  }
})();

module.exports = (async () => {
  const guilds = await GuildModel.find();
  const props = [
    {
      name: "level_up_messages",
      replaceWith: {
        name: "level_data",
        values: {
          enabled: (guild) => !isDisabled(guild.level_up_messages),
          message: "{user.tag} advanced to level {newLevel}",
        },
      },
    },
    {
      name: "leave_channel",
      replaceWith: {
        name: "leave_data",
        values: {
          enabled: (guild) => !isDisabled(guild.leave_channel),
          channel_id: (guild) => (!guild?.leave_channel ? null : guild?.leave_channel),
          message: (guild) => (!guild?.leave_message ? null : guild?.leave_message),
        },
      },
    },
    {
      name: "welcome_channel",
      replaceWith: {
        name: "welcome_data",
        values: {
          enabled: (guild) => !isDisabled(guild.welcome_channel),
          message: (guild) => {
            return !guild.welcome_message ? "Welcome {user} to {server}!" : guild.welcome_message;
          },
          channel_id: (guild) => {
            return !guild?.welcome_channel ? null : guild?.welcome_channel;
          },
          role_id: (guild) => {
            return !guild.welcome_role ? null : guild?.welcome_role;
          },
        },
      },
    },
    {
      name: "ticket_role",
      replaceWith: {
        name: "ticket_data",
        values: {
          enabled: (guild) =>
            !guild.disabled_commands?.includes("createticket") ||
            !isDisabled(guild.ticket_role) ||
            !isDisabled(guild.ticket_parent_channel),
          parent_id: (guild) => {
            return !guild?.ticket_parent_channel ? null : guild?.ticket_parent_channel;
          },
          role_id: (guild) => {
            return !guild.ticket_role ? null : guild?.ticket_role;
          },
        },
      },
    },
    {
      name: "starboards_channel_id",
      replaceWith: {
        name: "starboards_data",
        values: {
          enabled: (guild) => !isDisabled(guild.starboards_channel_id),
          channel_id: (guild) => guild?.starboards_channel_id || null,
          emoji: "⭐",
        },
      },
    },
  ];

  guilds.forEach((guild) => {
    props.forEach((prop) => {
      guild[prop.replaceWith.name] = {
        enabled: prop.replaceWith.values.enabled(guild),
        message:
          typeof prop.replaceWith.values?.message === "function"
            ? prop.replaceWith.values?.message(guild)
            : prop.replaceWith.values?.message,
        channel_id: prop.replaceWith.values?.channel_id?.(guild),
        role_id: prop.replaceWith.values?.role_id?.(guild),
        emoji: prop.replaceWith.values?.emoji,
      };
    });
    guild.save();
  });
})();
