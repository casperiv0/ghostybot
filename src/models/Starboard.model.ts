import { model, Schema, models, Document } from "mongoose";

const StarboardModel = new Schema({
  guildID: { type: String, required: true },
  channelID: { type: String, required: true },
  options: { type: Object, default: {} },
});

export default models.Starboard || model("Starboard", StarboardModel);
