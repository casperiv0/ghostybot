import { GiveawaysMessages } from "discord-giveaways";
import { model, Schema, models, Document } from "mongoose";

export interface IGiveaway extends Document {
  messageID: string;
  channelID: string;
  guildID: string;
  startAt: number;
  endAt: number;
  ended: boolean;
  winnerCount: number;
  prize: string;
  messages: GiveawaysMessages;
  hostedBy: string;
}

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

export default models.Giveaway || model<IGiveaway>("Giveaway", GiveawaySchema);
