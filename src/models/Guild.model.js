const { model, Schema, models } = require("mongoose");

const DEFAULT_MESSAGE = `**Username:** {user.username}
**Tag:** {user.tag}
**Id:** {user.id}
`;

const guildSchema = new Schema({
  guild_id: { type: String, required: true },
  prefix: { type: String, default: "!" },
  level_up_messages: { type: Boolean, default: false },
  store: { type: Array, default: null },
  blacklistedwords: { type: Array, default: [] },
  announcement_channel: { type: String, default: null },
  suggest_channel: { type: String, default: null },
  welcome_channel: { type: String, default: null },
  leave_channel: { type: String, default: null },
  welcome_role: { type: String, default: null },
  audit_channel: { type: String, default: null },
  custom_commands: { type: Array, default: [] },
  disabled_commands: { type: Array, default: [] },
  disabled_categories: { type: Array, default: [] },
  sticky_data: { type: Object, default: null },
  locale: { type: String, default: "english" },
  ignored_channels: { type: Array, default: [] },
  welcome_message: { type: String, default: DEFAULT_MESSAGE },
  leave_message: { type: String, default: DEFAULT_MESSAGE },
  timezone: { type: String, default: "America/New_York" },
  auto_delete_cmd: { type: Boolean, default: false },
  ticket_role: { type: String, default: null },
  ticket_parent_channel: { type: String, default: null },
});

module.exports = models.Guild || model("Guild", guildSchema);
