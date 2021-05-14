import { GiveawayData, GiveawaysManager } from "discord-giveaways";
import GiveawayModel from "models/Giveaway.model";

export default class MongoGiveawayManager extends GiveawaysManager {
  async getAllGiveaways() {
    return await GiveawayModel.find();
  }

  async saveGiveaway(messageId: string, giveawayData: GiveawayData): Promise<boolean> {
    await GiveawayModel.create(giveawayData);

    return true;
  }

  async editGiveaway(messageId: string, giveawayData: GiveawayData): Promise<boolean> {
    await GiveawayModel.findOneAndUpdate({ messageID: messageId }, giveawayData).exec();

    return true;
  }

  // @ts-expect-error ignore
  async deleteGiveaway(messageId: string): Promise<boolean> {
    await GiveawayModel.findOneAndDelete({ messageID: messageId }).exec();

    return true;
  }
}
