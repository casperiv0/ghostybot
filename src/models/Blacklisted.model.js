const { model, Schema, models } = require("mongoose");

const blacklistSchema = new Schema({
  user_id: { type: String, required: true },
});

module.exports = models.Blacklisted || model("Blacklisted", blacklistSchema);
