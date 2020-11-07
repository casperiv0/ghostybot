const { model, Schema } = require("mongoose");

const guildSchema = new Schema({
  guild_id: { type: String, required: true },
  prefix: { type: String, default: "!" },
  level_up_messages: { type: Boolean, default: false },
  store: { type: Array, default: null },
  blacklistedwords: { type: Array, default: null },
  announcement_channel: { type: String, default: null },
  suggest_channel: { type: String, default: null },
  welcome_channel: { type: String, default: null },
  leave_channel: { type: String, default: null },
  welcome_role: { type: String, default: null },
  custom_commands: { type: Array, default: null },
  disabled_commands: { type: Array, default: [] },
  disabled_categories: { type: Array, default: [] },
  sticky_data: { type: Object, default: null },
});

module.exports = model("Guild", guildSchema);
