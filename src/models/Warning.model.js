const { model, Schema, models } = require("mongoose");

const warningSchema = new Schema({
  user_id: { type: String, required: true },
  guild_id: { type: String, required: true },
  reason: { type: String, default: null },
});

module.exports = models.Warning || model("Warning", warningSchema);
