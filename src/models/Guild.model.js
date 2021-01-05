const { model, Schema, models } = require("mongoose");

const DEFAULT_MESSAGE = `**Username:** {user.username}
**Tag:** {user.tag}
**Id:** {user.id}
`;

const guildSchema = new Schema({
  guild_id: { type: String, required: true },
  prefix: { type: String, default: "!" },
  store: { type: Array, default: null },
  blacklistedwords: { type: Array, default: [] },
  announcement_channel: { type: String, default: null },
  suggest_channel: { type: String, default: null },
  audit_channel: { type: String, default: null },
  custom_commands: { type: Array, default: [] },
  disabled_commands: { type: Array, default: [] },
  disabled_categories: { type: Array, default: [] },
  sticky_data: { type: Object, default: null },
  locale: { type: String, default: "english" },
  ignored_channels: { type: Array, default: [] },
  timezone: { type: String, default: "America/New_York" },
  auto_delete_cmd: { type: Boolean, default: false },
  member_count_channel_id: { type: String, default: null },
  muted_role_id: { type: String, default: null },

  // OLD Stuff - delete after migrating
  starboards_channel_id: { type: String, default: null },
  ticket_role: { type: String, default: null },
  ticket_parent_channel: { type: String, default: null },
  welcome_channel: { type: String, default: null },
  leave_channel: { type: String, default: null },
  welcome_role: { type: String, default: null },
  welcome_message: { type: String, default: DEFAULT_MESSAGE },
  leave_message: { type: String, default: DEFAULT_MESSAGE },
  level_up_messages: { type: Boolean, default: false },


  // NEW STUFF - don't use this yet.
  level_data: {
    type: Object,
    default: { message: "{user.tag} advanced to level {newLevel}", enabled: true },
  },
  welcome_data: {
    type: Object,
    default: {
      message: DEFAULT_MESSAGE,
      enabled: false,
      channel_id: null,
      role_id: null,
    },
  },
  leave_data: {
    type: Object,
    default: { message: DEFAULT_MESSAGE, enabled: true },
  },
  ban_data: {
    type: Object,
    default: { enabled: true, message: "{user} was banned for {reason}" },
  },
  ticket_data: {
    type: Object,
    default: { enabled: false, channel_id: null, parent_id: null },
  },
  starboards_data: {
    type: Object,
    default: { enabled: false, channel_id: null, emoji: "⭐" },
  },
});

module.exports = models.Guild || model("Guild", guildSchema);
