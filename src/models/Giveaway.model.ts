import { model, Schema, models, Document } from "mongoose";

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

export default models.Giveaway || model("Giveaway", GiveawaySchema);
