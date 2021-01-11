import StarboardsManager from "discord-starboards";
import StarboardModel from "../models/Starboard.model";

class MongStarboardsManager extends StarboardsManager {
  async getAllStarboards() {
    return await StarboardModel.find();
  }

  async saveStarboard(data: any) {
    const giv = new StarboardModel(data);
    await giv.save();

    return true;
  }

  async deleteStarboard(channelID: any) {
    await StarboardModel.findOneAndDelete({ channelID });

    return true;
  }
}

module.exports = MongStarboardsManager;
