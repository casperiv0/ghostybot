const StarboardsManager = require("discord-starboards");
const StarboardModel = require("../models/Starboard.model");

class MongStarboardsManager extends StarboardsManager {
  async getAllStarboards() {
    return await StarboardModel.find();
  }

  async saveStarboard(data) {
    const giv = new StarboardModel(data);
    await giv.save();

    return true;
  }

  async deleteStarboard(channelID) {
    await StarboardModel.findOneAndDelete({ channelID });

    return true;
  }
}

module.exports = MongStarboardsManager;
