const { model, Schema } = require("mongoose");

const guildSchema = new Schema({
  guild_id: { type: String, required: true },
  prefix: { type: String, default: "!" },
  store: { type: Array, default: null },
  blacklistedwords: { type: Array, default: null },
  announcement_channel: { type: String, default: null },
  suggest_channel: { type: String, default: null },
  welcome_channel: { type: String, default: null },
  leave_channel: { type: String, default: null },
  welcome_role: { type: String, default: null },
  custom_commands: { type: Array, default: null },
  sticky_data: { type: Object, default: null },
});

module.exports = model("Guild", guildSchema);
