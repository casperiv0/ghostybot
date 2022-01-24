import { GiveawayData, GiveawaysManager } from "discord-giveaways";
import GiveawayModel from "models/Giveaway.model";

export class MongoGiveawayManager extends GiveawaysManager {
  async getAllGiveaways() {
    return GiveawayModel.find();
  }

  async saveGiveaway(_: string, giveawayData: GiveawayData): Promise<boolean> {
    await GiveawayModel.create(giveawayData);

    return true;
  }

  async editGiveaway(messageId: string, giveawayData: GiveawayData): Promise<boolean> {
    await GiveawayModel.findOneAndUpdate({ messageId }, giveawayData).exec();

    return true;
  }

  async deleteGiveaway(messageId: string): Promise<boolean> {
    await GiveawayModel.findOneAndDelete({ messageId }).exec();

    return true;
  }
}
