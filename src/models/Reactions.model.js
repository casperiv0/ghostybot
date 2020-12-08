const { model, Schema, models } = require("mongoose");

const ReactionsSchema = new Schema({
  guild_id: { type: String, required: true },
  message_id: { type: String, required: true },
  role_id: { type: String, required: true },
  channel_id: { type: String, required: true },
  reaction: { type: String, required: true },
});

module.exports = models.Reaction || model("Reaction", ReactionsSchema);
