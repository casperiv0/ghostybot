import { model, Schema, models, Document } from "mongoose";
import { Starboard } from "../modules/StarboardsManager";

export interface IStarboard extends Document {
  guildID: string;
  channelID: string;
  options: Starboard;
}

const StarboardModel = new Schema({
  guildID: { type: String, required: true },
  channelID: { type: String, required: true },
  options: { type: Object, default: {} },
});

export default models.Starboard || model("Starboard", StarboardModel);
