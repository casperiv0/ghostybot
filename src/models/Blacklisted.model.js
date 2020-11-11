const { model, Schema } = require("mongoose");

const blacklistSchema = new Schema({
  user_id: { type: String, required: true },
});

module.exports = model("Blacklisted", blacklistSchema);
