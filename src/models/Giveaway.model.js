const { model, Schema, models } = require("mongoose");

const GiveawaySchema = new Schema({
  messageID: String,
  channelID: String,
  guildID: String,
  startAt: Number,
  endAt: Number,
  ended: Boolean,
  winnerCount: String,
  prize: String,
  messages: Object,
  hostedBy: String,
});

module.exports = models.Giveaway || model("Giveaway", GiveawaySchema);
