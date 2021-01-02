const { model, Schema, models } = require("mongoose");

const BotSchema = new Schema({
  bot_id: {
    type: String,
    required: true,
  },
  total_used_cmds: {
    type: Number,
    default: 0,
  },
  used_since_up: {
    type: Number,
    default: 0,
  },
});

module.exports = models.Bot || model("Bot", BotSchema);
