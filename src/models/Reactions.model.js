const { model, Schema, models } = require("mongoose");

const ReactionsSchema = new Schema({
  guild_id: { type: String, required: true },
  message_id: { type: String, required: true },
  channel_id: { type: String, required: true },
  reactions: { type: Array, required: true },
});

module.exports = models.Reaction || model("Reaction", ReactionsSchema);
