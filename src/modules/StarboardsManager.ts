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

  async deleteStarboard(channelID: string, emoji: string) {
    await StarboardModel.findOneAndDelete({ channelID, emoji });

    return true;
  }
}

module.exports = MongStarboardsManager;
