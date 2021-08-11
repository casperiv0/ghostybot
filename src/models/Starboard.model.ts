import { model, Schema, models, Document } from "mongoose";
import { Starboard } from "handlers/StarboardsManager";

export interface IStarboard extends Document {
  guildId: string;
  channelId: string;
  options: Starboard;
}

/**
 * @deprecated will be removed when message intents arrive
 */
const StarboardModel = new Schema({
  guildId: { type: String, required: true },
  channelId: { type: String, required: true },
  options: { type: Object, default: {} },
});

export default models.Starboard || model("Starboard", StarboardModel);
