const { GiveawaysManager } = require("discord-giveaways");
const GiveawayModel = require("../models/Giveaway.model");

class MongoGiveawayManager extends GiveawaysManager {
  async getAllGiveaways() {
    return await GiveawayModel.find();
  }

  async saveGiveaway(messageId, giveawayData) {
    const giv = new GiveawayModel(giveawayData);
    await giv.save();

    return true;
  }

  async editGiveaway(messageId, giveawayData) {
    await this.deleteGiveaway(messageId);

    await this.saveGiveaway(messageId, giveawayData);
    return true;
  }

  async deleteGiveaway(messageId) {
    await GiveawayModel.findOneAndDelete({ messageID: messageId });

    return true;
  }
}

module.exports = MongoGiveawayManager;
