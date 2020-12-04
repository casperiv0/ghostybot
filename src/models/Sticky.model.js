const { model, Schema, models } = require("mongoose");

const stickySchema = new Schema({
  channel_id: { type: String, required: true },
  message_id: { type: String, required: true },
  message: { type: String, required: true },
});

module.exports = models.Sticky || model("Sticky", stickySchema);
