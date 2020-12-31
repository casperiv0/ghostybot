const { model, Schema, models } = require("mongoose");

const StarboardModel = new Schema({
  guildID: { type: String, required: true },
  channelID: { type: String, required: true },
  options: { type: Object, default: {} },
});

module.exports = models.Starboard || model("Starboard", StarboardModel);
